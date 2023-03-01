CREATE DATABASE classroom;

USE classroom;

CREATE TABLE user (
    id INTEGER(11) PRIMARY KEY AUTO_INCREMENT,
    dni INTEGER(11) NOT NULL UNIQUE,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    role ENUM('alumno','profesor','admin') NOT NULL
);

CREATE TABLE skills (
    id INTEGER(11) PRIMARY KEY AUTO_INCREMENT,
    skill ENUM('mates', 'castellano', 'ingles', 'valenciano', 'fisica', 'quimica', 'informatica') NOT NULL,
    description TEXT
);

-- CREATE TABLE links (
--     id INTEGER(11) PRIMARY KEY AUTO_INCREMENT,
--     title VARCHAR(150) NOT NULL,
--     url VARCHAR(255) NOT NULL,
--     description TEXT,
--     user_id INTEGER(11),
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user(id) 
-- );

DESCRIBE links;
