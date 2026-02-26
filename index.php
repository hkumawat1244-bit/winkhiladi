<?php 
session_start();
if($_SESSION['admin'] != 'ADMIN001') {
    header('Location: ../index.php');
    exit();
}
require '../api.php';
$totalUsers = countUsers();
$totalBalance = totalBalance();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel - Lottery System</title>
    <link rel="stylesheet" href="admin.css">
</head>
<body>
    <div class="admin-dashboard">
        <nav class="sidebar">
            <h2>🎰 Admin Panel</h2>
            <a href="index.php" class="active"><i class="fas fa-chart-line"></i> Dashboard</a>
            <a href="deposits.php"><i class="fas fa-plus"></i> Deposits</a>
            <a href="withdrawals.php"><i class="fas fa-minus"></i> Withdrawals</a>
            <a href="users.php"><i class="fas fa-users"></i> Users</a>
        </nav>

        <main class="admin-main">
            <div class="stats-cards">
                <div class="stat-card revenue">
                    <h3>₹<?= number_format($totalBalance) ?></h3>
                    <p>Total Balance</p>
                </div>
                <div class="stat-card users">
                    <h3><?= $totalUsers ?></h3>
                    <p>Active Users</p>
                </div>
                <div class="stat-card bets">
                    <h3><?= countBetsToday() ?></h3>
                    <p>Today's Bets</p>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="activity">
                <h3>Recent Transactions</h3>
                <?php foreach(getRecentTransactions(10) as $tx): ?>
                <div class="tx-item">
                    <span><?= $tx['username'] ?></span>
                    <span><?= $tx['type'] ?> ₹<?= $tx['amount'] ?></span>
                    <small><?= $tx['created_at'] ?></small>
                </div>
                <?php endforeach; ?>
            </div>
        </main>
    </div>
</body>
</html>
