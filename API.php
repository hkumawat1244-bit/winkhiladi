<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

$host = 'localhost';
$dbname = 'lottery_game';
$username = 'your_db_user';
$password = 'your_db_pass';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die(json_encode(['error' => 'DB Connection Failed']));
}

$action = $_GET['action'] ?? '';

if ($action === 'stats') {
    $stmt = $pdo->query("SELECT COUNT(*) as players FROM users");
    $players = $stmt->fetch()['players'];
    
    $stmt = $pdo->query("SELECT COUNT(*) as bets FROM bets");
    $bets = $stmt->fetch()['bets'];
    
    echo json_encode([
        'players' => $players,
        'bets' => $bets,
        'profit' => 125000
    ]);
}

if ($_POST['action'] === 'add_balance') {
    $pdo->exec("UPDATE users SET balance = balance + 10000");
    echo json_encode(['success' => true]);
}
?>
