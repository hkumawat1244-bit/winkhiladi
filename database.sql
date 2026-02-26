CREATE DATABASE lottery_system;
USE lottery_system;

-- Users
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(10) UNIQUE,
    username VARCHAR(50),
    password VARCHAR(255),
    balance DECIMAL(12,2) DEFAULT 1000,
    total_deposit DECIMAL(12,2) DEFAULT 0,
    total_win DECIMAL(12,2) DEFAULT 0,
    total_bet DECIMAL(12,2) DEFAULT 0,
    referral_code VARCHAR(10) UNIQUE,
    referrer_id INT,
    level INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (referrer_id) REFERENCES users(id)
);

-- Games & Results
CREATE TABLE games (
    id INT PRIMARY KEY AUTO_INCREMENT,
    period VARCHAR(20),
    red_count INT DEFAULT 0,
    green_count INT DEFAULT 0,
    violet_count INT DEFAULT 0,
    result ENUM('red','green','violet'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bets
CREATE TABLE bets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    game_id INT,
    colour ENUM('red','green','violet'),
    amount DECIMAL(12,2),
    multiplier DECIMAL(5,2),
    payout DECIMAL(12,2) DEFAULT 0,
    won BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (game_id) REFERENCES games(id)
);

-- Transactions
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    type ENUM('deposit','withdraw','bet','win','referral'),
    amount DECIMAL(12,2),
    txid VARCHAR(100),
    status ENUM('pending','completed','failed'),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- OTP
CREATE TABLE otps (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(10),
    otp VARCHAR(6),
    expires DATETIME
);

-- Admin Logs
CREATE TABLE admin_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    admin_id INT,
    action VARCHAR(255),
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (phone, username, balance, referral_code) VALUES 
('ADMIN', 'ADMIN001', 1000000, 'ADMIN'),
('9876543210', 'TESTER', 5000, 'TEST001');
