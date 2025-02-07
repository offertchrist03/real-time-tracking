CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (name, password) VALUES
('Alice', crypt('password1', gen_salt('bf'))),
('Bob', crypt('password2', gen_salt('bf'))),
('Charlie', crypt('password3', gen_salt('bf'))),
('David', crypt('password4', gen_salt('bf'))),
('Emma', crypt('password5', gen_salt('bf'))),
('Frank', crypt('password6', gen_salt('bf'))),
('Grace', crypt('password7', gen_salt('bf'))),
('Henry', crypt('password8', gen_salt('bf'))),
('Isabella', crypt('password9', gen_salt('bf'))),
('Jack', crypt('password10', gen_salt('bf'))),
('Kelly', crypt('password11', gen_salt('bf'))),
('Liam', crypt('password12', gen_salt('bf'))),
('Mia', crypt('password13', gen_salt('bf'))),
('Noah', crypt('password14', gen_salt('bf'))),
('Olivia', crypt('password15', gen_salt('bf'))),
('Paul', crypt('password16', gen_salt('bf'))),
('Quinn', crypt('password17', gen_salt('bf'))),
('Ryan', crypt('password18', gen_salt('bf'))),
('Sophia', crypt('password19', gen_salt('bf'))),
('Thomas', crypt('password20', gen_salt('bf')));
