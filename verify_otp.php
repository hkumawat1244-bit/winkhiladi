<?php
$conn = new mysqli("localhost","DB_USER","DB_PASS","DB_NAME");

$mobile = $_POST['mobile'];
$otp = $_POST['otp'];

$result = $conn->query("SELECT * FROM otp_verification 
                        WHERE mobile='$mobile' AND otp='$otp' 
                        ORDER BY id DESC LIMIT 1");

if($result->num_rows > 0){
    echo "verified";
}else{
    echo "invalid";
}
?>
