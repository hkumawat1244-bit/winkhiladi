<?php
$conn = new mysqli("localhost","DB_USER","DB_PASS","DB_NAME");

$mobile = $_POST['mobile'];
$otp = rand(100000,999999);

// Save OTP
$conn->query("INSERT INTO otp_verification (mobile, otp) VALUES ('$mobile','$otp')");

// Fast2SMS API
$fields = array(
    "sender_id" => "FSTSMS",
    "message" => "Your OTP is $otp",
    "language" => "english",
    "route" => "q",
    "numbers" => $mobile,
);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://www.fast2sms.com/dev/bulkV2",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode($fields),
  CURLOPT_HTTPHEADER => array(
    "authorization: YOUR_API_KEY",
    "accept: */*",
    "cache-control: no-cache",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
curl_close($curl);

echo "OTP Sent";
?>
