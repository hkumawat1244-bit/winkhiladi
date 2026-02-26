<?php
// Razorpay/Paytm UPI Auto Check
// Integrate with: Razorpay Callback URL

function verifyUPI($txid, $amount) {
    // Razorpay Virtual Account API
    $api_key = "YOUR_RAZORPAY_KEY";
    $url = "https://api.razorpay.com/v1/payments/$txid";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Basic " . base64_encode($api_key . ":")
    ]);
    
    $response = curl_exec($ch);
    $payment = json_decode($response, true);
    
    if($payment['status'] == 'captured' && $payment['amount'] == $amount*100) {
        return true;
    }
    return false;
}
?>
