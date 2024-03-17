INSERT INTO organisations (id, name)
VALUES ('u2wHWUbnWUaUUjBeNvQ4u', 'Acme Corp');

INSERT INTO users (first_name, last_name, organisation_id, password, email)
VALUES ('John', 'Doe', 'u2wHWUbnWUaUUjBeNvQ4u', crypt('password', gen_salt('bf')), 'john@dokedu.org');
