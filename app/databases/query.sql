CREATE DATABASE usuarios01;
CREATE USER 'alexisuser'@'localhost' IDENTIFIED BY 'alexisuser';
GRANT ALL PRIVILEGES ON usuarios01.* TO 'alexisuser'@'localhost';
FLUSH PRIVILEGES;
USE usuarios01;

CREATE TABLE IF NOT EXISTS usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    idtoken CHAR(36) DEFAULT (UUID()),
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (email)
);