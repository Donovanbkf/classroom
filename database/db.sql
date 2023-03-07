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

CREATE TABLE asignature (
    id INTEGER(11) PRIMARY KEY AUTO_INCREMENT,
    skill ENUM('mates', 'castellano', 'ingles', 'valenciano', 'fisica', 'quimica', 'informatica') NOT NULL,
    description TEXT
);

CREATE TABLE notas (
    user_id INTEGER(11) NOT NULL, 
    asignature_id INTEGER(11) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (asignature_id) REFERENCES asignature(id),
    estado ENUM('en curso','finalizada') NOT NULL,
    nota FLOAT(10)
);

DESCRIBE user;
DESCRIBE asignature;
DESCRIBE notas;