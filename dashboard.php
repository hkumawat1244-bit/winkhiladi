<?php 
session_start();
require 'api.php';
$user = getUser($_SESSION['user_id']);
$latestGame = getLatestGame();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard - <?= $user['username'] ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- 30s Lock Screen -->
    <div id="lockScreen" class="lock-full">
        <div class="lock-content">
            <i class="fas fa-shield-alt fa-4x"></i>
            <div id="lockCount">30</div>
            <p>🔒 Anti-Cheat Active</p>
        </div>
    </div>

    <div class="dashboard">
        <!-- Top Bar -->
        <div class="topbar">
            <div class="user-info">
                <span>ID: <?= $user['username'] ?></span>
                <span>Level: <?= $user['level'] ?></span>
            </div>
            <div class="balance-box">
                <i class="fas fa-wallet"></i>
                <strong>₹<?= number_format($user['balance']) ?></strong>
            </div>
            <a href="logout.php" class="logout">Logout</a>
        </div>

        <!-- Game Stats -->
        <div class="stats-grid">
            <div class="stat red">🔴 Red: <?= $latestGame['red_count'] ?></div>
            <div class="stat green">🟢 Green: <?= $latestGame['green_count'] ?></div>
            <div class="stat violet">🟣 Violet: <?= $latestGame['violet_count'] ?></div>
        </div>

        <!-- Bet Panel -->
        <div class="bet-panel">
            <div class="timer" id="timer">00:03:00</div>
            <div class="status" id="status">🟢 OPEN</div>
            
            <!-- Amount Buttons -->
            <div class="amount-grid">
                <button class="amt-btn active" data-amt="100">₹100</button>
                <button class="amt-btn" data-amt="500">₹500</button>
                <button class="amt-btn" data-amt="1000">₹1K</button>
                <button class="amt-btn" data-amt="5000">₹5K</button>
            </div>

            <!-- Colour Bet -->
            <div class="colour-grid">
                <button class="colour-btn red" data-colour="red">
                    <span class="emoji">🔴</span> RED<br><small>2.0x</small>
                </button>
                <button class="colour-btn green" data-colour="green">
                    <span class="emoji">🟢</span> GREEN<br><small>2.0x</small>
                </button>
                <button class="colour-btn violet" data-colour="violet">
                    <span class="emoji">🟣</span> VIOLET<br><small>9.0x</small>
                </button>
            </div>
            
            <button id="betBtn" class="bet-confirm" onclick="placeBet()">
                🚀 BET ₹100
            </button>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
            <a href="#deposit" class="action-btn deposit">+ Deposit</a>
            <a href="#withdraw" class="action-btn withdraw">- Withdraw</a>
            <a href="#history" class="action-btn history">History</a>
            <a href="#" class="action-btn share" onclick="shareReferral()">👥 Refer & Earn</a>
        </div>
    </div>

    <script>
    // Auto Game Loop + Real Betting
    let gameTime = 180; // 3 minutes
    let selectedAmount = 100;
    let selectedColour = null;
    
    // 30s Anti-Cheat Lock
    setTimeout(() => {
        document.getElementById('lockScreen').style.display = 'none';
    }, 30000);

    // Game Timer
    setInterval(() => {
        gameTime--;
        updateTimer();
        if(gameTime <= 0) {
            generateResult();
            gameTime = 180;
        }
    }, 1000);
    </script>
</body>
</html>
