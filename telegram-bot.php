<?php
// Telegram Bot Token: @BotFather
$botToken = "YOUR_BOT_TOKEN";
$chatId = "-100123456789"; // Your Channel

function sendPrediction($colour) {
    global $botToken, $chatId;
    
    $period = date('YmdHi');
    $message = "🔥 PERIOD $period\n\n";
    $message .= "🎯 80% CONFIDENCE\n";
    $message .= "🎲 RECOMMEND: $colour\n";
    $message .= "💰 Expected Payout: 2x\n\n";
    $message .= "⚡ Join Now: yourgame.tk";
    
    $url = "https://api.telegram.org/bot$botToken/sendMessage";
    $data = [
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'HTML'
    ];
    
    file_get_contents($url . '?' . http_build_query($data));
}

// Auto-send every game
if(date('i') % 3 == 0) {
    $predictions = ['RED', 'GREEN', 'RED', 'VIOLET'];
    sendPrediction($predictions[array_rand($predictions)]);
}
?>
