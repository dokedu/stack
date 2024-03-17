-- name: FileListByBucketId :many
SELECT *
FROM files
WHERE bucket_id = @bucket_id
  AND organisation_id = @organisation_id
  AND deleted_at IS NULL
ORDER BY name DESC;

-- name: FileById :one
SELECT *
FROM files
WHERE id = @id
  AND organisation_id = @organisation_id
  AND deleted_at IS NULL
LIMIT 1;


-- name: CreateFile :one
INSERT INTO files (name, mime_type, bucket_id, organisation_id)
VALUES (@name, @mime_type, @bucket_id, @organisation_id)
RETURNING *;

-- name: UpdateFileName :one
UPDATE files
SET name = @name
WHERE id = @id
  AND organisation_id = @organisation_id
RETURNING *;

-- name: DeleteFile :one
UPDATE files
SET deleted_at = NOW()
WHERE id = @id
  AND organisation_id = @organisation_id
RETURNING *;
