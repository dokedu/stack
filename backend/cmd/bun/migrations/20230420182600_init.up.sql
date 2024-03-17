SET statement_timeout = 0;

CREATE TABLE organisations
(
    id         text        NOT NULL PRIMARY KEY DEFAULT nanoid(),
    name       text        NOT NULL,
    created_at timestamptz NOT NULL             DEFAULT NOW(),
    deleted_at timestamptz
);

CREATE TABLE files
(
    id              text        NOT NULL PRIMARY KEY DEFAULT nanoid(),
    name            text        NOT NULL,
    mime_type       text        NOT NULL,
    size            bigint      NOT NULL             DEFAULT 0,
    bucket_id       text        NOT NULL,
    organisation_id text        NOT NULL REFERENCES organisations,
    created_at      timestamptz NOT NULL             DEFAULT NOW(),
    deleted_at      timestamptz NULL
);

CREATE TABLE users
(
    id               text        NOT NULL PRIMARY KEY DEFAULT nanoid(),
    first_name       text        NOT NULL,
    last_name        text        NOT NULL,
    email            text        NOT NULL UNIQUE,
    password         text        NULL,
    recovery_token   text        NULL,
    recovery_sent_at timestamptz NULL,
    avatar_file_id   text        NULL REFERENCES files,
    organisation_id  text        NOT NULL REFERENCES organisations,
    created_at       timestamptz NOT NULL             DEFAULT NOW(),
    deleted_at       timestamptz
);

CREATE TABLE sessions
(
    id         text        NOT NULL PRIMARY KEY DEFAULT nanoid(),
    token      text        NOT NULL,
    user_id    text        NOT NULL REFERENCES users,
    created_at timestamptz NOT NULL             DEFAULT NOW(),
    deleted_at timestamptz NULL
);
