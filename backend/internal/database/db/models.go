// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0

package db

import (
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

type File struct {
	ID             string             `db:"id"`
	Name           string             `db:"name"`
	MimeType       string             `db:"mime_type"`
	Size           int64              `db:"size"`
	BucketID       string             `db:"bucket_id"`
	OrganisationID string             `db:"organisation_id"`
	CreatedAt      time.Time          `db:"created_at"`
	DeletedAt      pgtype.Timestamptz `db:"deleted_at"`
}

type Organisation struct {
	ID        string             `db:"id"`
	Name      string             `db:"name"`
	CreatedAt time.Time          `db:"created_at"`
	DeletedAt pgtype.Timestamptz `db:"deleted_at"`
}

type Session struct {
	ID        string             `db:"id"`
	Token     string             `db:"token"`
	UserID    string             `db:"user_id"`
	CreatedAt time.Time          `db:"created_at"`
	DeletedAt pgtype.Timestamptz `db:"deleted_at"`
}

type User struct {
	ID             string             `db:"id"`
	FirstName      string             `db:"first_name"`
	LastName       string             `db:"last_name"`
	Email          string             `db:"email"`
	Password       pgtype.Text        `db:"password"`
	RecoveryToken  pgtype.Text        `db:"recovery_token"`
	RecoverySentAt pgtype.Timestamptz `db:"recovery_sent_at"`
	AvatarFileID   pgtype.Text        `db:"avatar_file_id"`
	OrganisationID string             `db:"organisation_id"`
	CreatedAt      time.Time          `db:"created_at"`
	DeletedAt      pgtype.Timestamptz `db:"deleted_at"`
}
