DROP DATABASE IF EXISTS todos_db;
CREATE DATABASE todos_db;
USE todos_db;
CREATE TABLE todos (
    id INTEGER AUTO_INCREMENT,
    task VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);
INSERT INTO todos (id, task, completed)
VALUES (1, "dishes", false),
(2, "laundry", false),
(3, "groceries", false);
SELECT * FROM todos;todos