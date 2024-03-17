package main

import (
	slogecho "github.com/samber/slog-echo"
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/dokedu/stack/backend/internal/database"
	"github.com/dokedu/stack/backend/internal/dataloaders"
	"github.com/dokedu/stack/backend/internal/graph"
	"github.com/dokedu/stack/backend/internal/mail"
	"github.com/dokedu/stack/backend/internal/middleware"
	"github.com/dokedu/stack/backend/internal/modules/minio"
	"github.com/dokedu/stack/backend/internal/msg"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	echomiddleware "github.com/labstack/echo/v4/middleware"

	_ "github.com/lib/pq"
)

const defaultPort = "1323"

func main() {
	//logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	dbClient := database.NewClient()
	defer dbClient.DB.Close()

	mailer := mail.NewClient()
	minioClient := minio.NewClient()

	e := echo.New()

	// Prevent the server from crashing on panic
	e.Use(echomiddleware.Recover())
	e.Use(slogecho.New(logger))

	// Add dataloader middleware
	loader := dataloaders.NewLoaders(dbClient)
	e.Use(dataloaders.Middleware(loader))

	e.Use(echomiddleware.CORS())
	e.Use(echomiddleware.BodyLimit("5G"))
	e.Use(echomiddleware.RateLimiter(echomiddleware.NewRateLimiterMemoryStore(60)))

	// Auth
	e.Use(middleware.Auth(dbClient))

	srv := handler.New(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{
		DB:     dbClient,
		Minio:  minioClient,
		Mailer: mailer,
	}}))

	var gb int64 = 1 << 30

	srv.SetErrorPresenter(msg.ErrPresenter)
	srv.AddTransport(transport.Websocket{
		KeepAlivePingInterval: 10 * time.Second,
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
		InitFunc: middleware.AuthWebsocket(dbClient),
	})
	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{
		// 1 GB
		MaxMemory:     1 * gb,
		MaxUploadSize: 1 * gb,
	})

	srv.SetQueryCache(lru.New(1000))

	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New(100),
	})

	playgroundHandler := playground.Handler("GraphQL playground", "/query")

	e.GET("/playground", func(c echo.Context) error {
		playgroundHandler.ServeHTTP(c.Response(), c.Request())
		return nil
	})

	e.POST("/query", func(c echo.Context) error {
		srv.ServeHTTP(c.Response(), c.Request())
		return nil
	})

	e.GET("/query", func(c echo.Context) error {
		srv.ServeHTTP(c.Response(), c.Request())
		return nil
	})

	// Add a health check endpoint
	e.GET("/up", func(e echo.Context) error {
		return e.String(http.StatusOK, "up")
	})

	// Start server
	e.Logger.Fatal(e.Start(":" + defaultPort))
}
