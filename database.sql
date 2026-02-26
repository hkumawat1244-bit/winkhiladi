CREATE DATABASE lottery_game;
USE lottery_game;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    balance DECIMAL(12,2) DEFAULT 5000,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10,2),
    number VARCHAR(1),
    result VARCHAR(1),
    win BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, balance) VALUES ('demo_player', 5000);
