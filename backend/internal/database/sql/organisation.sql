-- name: GLOBAL_OrganisationList :many
SELECT *
FROM organisations
WHERE deleted_at IS NULL;

-- name: GLOBAL_OrganisationById :one
SELECT *
FROM organisations
WHERE id = @id
  AND deleted_at IS NULL
LIMIT 1;

-- name: GLOBAL_CreateOrganisation :one
INSERT INTO organisations (name)
VALUES (@name)
RETURNING *;