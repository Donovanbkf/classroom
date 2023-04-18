CREATE DATABASE classroom;

USE classroom;

CREATE TABLE user (
    id INTEGER(11) PRIMARY KEY AUTO_INCREMENT,
    dni INTEGER(11) NOT NULL UNIQUE,
    username VARCHAR(16) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    name VARCHAR(16) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('alumno','profesor','admin') NOT NULL,
    cantidad INTEGER(10)
);

CREATE TABLE asignature (
    id INTEGER(11) PRIMARY KEY AUTO_INCREMENT,
    skill ENUM('mates', 'castellano', 'ingles', 'valenciano', 'fisica', 'quimica', 'informatica') NOT NULL,
    description TEXT,
    teacher_id INTEGER(11) NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES user(id)
);

CREATE TABLE matricula (
    student_id INTEGER(11) NOT NULL, 
    asignature_id INTEGER(11) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES user(id),
    FOREIGN KEY (asignature_id) REFERENCES asignature(id),
    estado ENUM('en curso','finalizada') NOT NULL,
    nota FLOAT(10)
);

DESCRIBE user;
DESCRIBE asignature;
DESCRIBE matricula;