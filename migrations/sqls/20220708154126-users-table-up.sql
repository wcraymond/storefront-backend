CREATE TABLE users (
  id         SERIAL       PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name  VARCHAR(100) NOT NULL,
  password   VARCHAR      NOT NULL
);