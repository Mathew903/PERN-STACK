CREATE DATABASE tasksdb;

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    title varchar(255) UNIQUE,
    description varchar(255)
);




