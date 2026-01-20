<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// PHPMailer imports
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


require __DIR__ . "/vendor/autoload.php";
    
$mail = new PHPMailer(true);

// Temporary debugging line
// $mail->SMTPDebug = SMTP::DEBUG_SERVER;

$mail->isSMTP();
$mail->SMTPAuth = true;

$mail->Host = "smtp.gmail.com";
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
$mail->Username = "teamjokers442@gmail.com";
$mail->Password = "bdjp yqni krdz nnai";

$mail->isHtml(true);

return $mail;

?>