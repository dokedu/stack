-- name: GLOBAL_UserList :many
SELECT *
FROM users;

-- name: UserById :one
SELECT *
FROM users
WHERE id = $1 AND organisation_id = $2;

-- name: GLOBAL_UserById :one
SELECT *
FROM users
WHERE id = $1
  AND deleted_at IS NULL;

-- name: GLOBAL_UserByIdWithDeleted :one
SELECT *
FROM users
WHERE id = $1;

-- name: GLOBAL_UserByEmail :one
SELECT *
FROM users
WHERE email = $1
  AND deleted_at IS NULL;

-- name: GLOBAL_UserFindBySession :one
SELECT *
FROM users
WHERE id = (SELECT user_id FROM sessions WHERE token = $1 LIMIT 1)
  AND deleted_at IS NULL
LIMIT 1;

-- name: GLOBAL_UsersByIds :many
SELECT *
FROM users
WHERE id = ANY (@ids::text[])
  AND deleted_at IS NULL;


-- name: UserList :many
SELECT *
FROM users
WHERE organisation_id = $1
  AND deleted_at IS NULL;

-- name: UserListCount :one
SELECT COUNT(*)
FROM users
WHERE organisation_id = $1
  AND deleted_at IS NULL;

-- name: UpdateUserRecoveryToken :one
UPDATE users
SET recovery_token = $1
WHERE id = $2
  AND organisation_id = $3
RETURNING *;

-- name: GLOBAL_UserByRecoveryToken :one
SELECT *
FROM users
WHERE recovery_token = $1
  AND deleted_at IS NULL
LIMIT 1;

-- name: UpdateUserPassword :one
UPDATE users
SET password = $1
WHERE id = $2
  AND organisation_id = $3
RETURNING *;

-- name: UserByIdWithDeleted :one
SELECT *
FROM users
WHERE id = $1
  AND organisation_id = $2
LIMIT 1;

-- name: CreateUser :one
INSERT INTO users (organisation_id, first_name, last_name, email, password)
VALUES (@organisation_id, @first_name, @last_name, @email, @password)
RETURNING *;

-- name: CreateUserWithId :one
INSERT INTO users (id, organisation_id, first_name, last_name, email, password)
VALUES (@id, @organisation_id, @first_name, @last_name, @email, @password)
RETURNING *;

-- name: GLOBAL_DeleteUserByEmail :one
UPDATE users
SET deleted_at = NOW()
WHERE email = LOWER($1)
  AND deleted_at IS NULL
RETURNING *;

-- name: UpdateUser :one
UPDATE users
SET first_name = @first_name,
    last_name  = @last_name
WHERE id = @id
  AND organisation_id = @organisation_id
RETURNING *;

-- name: DeleteUserById :one
UPDATE users
SET deleted_at = NOW()
WHERE id = @id
  AND organisation_id = @organisation_id
RETURNING *;
