CREATE DATABASE stay_focus_login;

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,

);

-- inser values in to db
INSERT INTO users (user_name, user_email, user_password)  VALUES ('sonu', 'sonu@gmail.com', 'password');
