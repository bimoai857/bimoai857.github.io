CREATE DATABASE todolist;

CREATE TABLE tasks(
    id INT SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(100),
    status BOOLEAN NOT NULL DEFAULT false
)