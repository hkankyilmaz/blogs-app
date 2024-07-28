
/**
    * Seed data for the database
*/

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT[] NOT NULL,
    author_id INT NOT NULL,
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users (id)
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    blog_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (blog_id) REFERENCES blog (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);




