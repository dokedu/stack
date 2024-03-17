package middleware

import (
	"context"
	"database/sql"
	"errors"
	"log/slog"
	"time"

	"github.com/dokedu/stack/backend/internal/database"
	"github.com/dokedu/stack/backend/internal/database/db"

	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/labstack/echo/v4"
)

type contextKey string

var UserCtxKey = contextKey("user")

func Auth(conn *database.DB) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			token := c.Request().Header.Get("Authorization")
			reqContext := c.Request().Context()

			userContext := authMiddlewareFunction(reqContext, conn, token)
			if userContext == nil {
				return next(c)
			}

			ctx := c.Request().Context()
			ctx = context.WithValue(ctx, UserCtxKey, userContext)
			c.SetRequest(c.Request().WithContext(ctx))

			return next(c)
		}
	}
}

func AuthWebsocket(conn *database.DB) transport.WebsocketInitFunc {
	return func(ctx context.Context, initPayload transport.InitPayload) (context.Context, *transport.InitPayload, error) {
		// read the authorization header from the init payload
		token := initPayload.Authorization()

		userContext := authMiddlewareFunction(ctx, conn, token)
		if userContext == nil {
			return ctx, nil, nil
		}

		ctx = context.WithValue(ctx, UserCtxKey, &userContext)

		return ctx, &initPayload, nil
	}
}

func authMiddlewareFunction(ctx context.Context, conn *database.DB, token string) *UserContext {
	// Allow unauthenticated users in
	if token == "" {
		return nil
	}

	session, err := conn.GLOBAL_SessionByToken(ctx, token)
	if err != nil {
		return nil
	}

	// Check if created at is no longer than 12 hours ago
	if session.CreatedAt.Add(12 * time.Hour).Before(time.Now()) {
		err := conn.GLOBAL_DeleteExpiredSession(ctx)
		if err != nil {
			slog.Error("unable to delete session for the database", "err", err)
		}

		return nil
	}

	user, err := conn.GLOBAL_UserById(ctx, session.UserID)
	if errors.Is(err, sql.ErrNoRows) {
		// Remove all sessions for this user if the user is deleted
		err := conn.GLOBAL_DeleteSessionsByUserID(ctx, session.UserID)
		if err != nil {
			slog.Error("unable to update sessions for deleted user", "err", err, "user_id", session.UserID)
		}

		return nil
	}

	return &UserContext{
		user,
		session.Token,
	}
}

// forContext finds the user from the context. REQUIRES Middleware to have run.
func forContext(ctx context.Context) *UserContext {
	raw, _ := ctx.Value(UserCtxKey).(*UserContext)
	return raw
}

type UserContext struct {
	db.User
	Token string
}

// GetUser Helper function to get the current user from the context.
func GetUser(ctx context.Context) (*UserContext, bool) {
	currentUser := forContext(ctx)
	if currentUser == nil {
		return nil, false
	}
	return currentUser, true
}
