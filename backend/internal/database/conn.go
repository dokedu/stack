package database

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5"

	"github.com/Masterminds/squirrel"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/dokedu/stack/backend/internal/database/db"
)

type DB struct {
	DB *pgxpool.Pool
	*db.Queries
}

func NewClient() *DB {
	ctx := context.Background()
	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", os.Getenv("DB_USER"),
		os.Getenv("DB_PASS"), os.Getenv("DB_HOST"), os.Getenv("DB_PORT"), os.Getenv("DB_NAME"))
	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		panic(err)
	}

	return &DB{
		DB:      pool,
		Queries: db.New(pool),
	}
}
func (d *DB) NewQueryBuilder() squirrel.StatementBuilderType {
	return squirrel.StatementBuilder.PlaceholderFormat(squirrel.Dollar)
}

func ExecUpdate(dbI *DB, ctx context.Context, query squirrel.UpdateBuilder) error {
	sql, args, err := query.ToSql()
	if err != nil {
		return err
	}

	_, err = dbI.DB.Exec(ctx, sql, args...)
	return err
}

func ScanUpdateOne[T any](dbI *DB, ctx context.Context, query squirrel.UpdateBuilder) (T, error) {
	var t T

	sql, args, err := query.ToSql()
	if err != nil {
		return t, err
	}

	rows, err := dbI.DB.Query(ctx, sql, args...)
	if err != nil {
		return t, err
	}

	return pgx.CollectOneRow(rows, pgx.RowToStructByName[T])
}

func ScanSelectOne[T any](dbI *DB, ctx context.Context, query squirrel.SelectBuilder) (T, error) {
	var t T

	sql, args, err := query.ToSql()
	if err != nil {
		return t, err
	}

	rows, err := dbI.DB.Query(ctx, sql, args...)
	if err != nil {
		return t, err
	}

	return pgx.CollectOneRow(rows, pgx.RowToStructByName[T])
}

func ScanSelectMany[T any](dbI *DB, ctx context.Context, query squirrel.SelectBuilder) ([]T, error) {
	sql, args, err := query.ToSql()
	if err != nil {
		return nil, err
	}

	rows, err := dbI.DB.Query(ctx, sql, args...)
	if err != nil {
		return nil, err
	}

	return pgx.CollectRows(rows, pgx.RowToStructByName[T])
}
