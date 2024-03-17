package graph

//go:generate go run github.com/99designs/gqlgen generate

import (
	"github.com/dokedu/stack/backend/internal/database"
	"github.com/dokedu/stack/backend/internal/mail"
	"github.com/minio/minio-go/v7"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	DB     *database.DB
	Minio  *minio.Client
	Mailer mail.Mailer
}
