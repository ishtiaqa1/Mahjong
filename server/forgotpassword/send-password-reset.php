<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

ini_set('display_errors', 0);
error_reporting(0);

require_once __DIR__ . '/../db.php';

// Email, token, and expiration time (currently 5min)
$email = $_POST["email"];
$token = bin2hex(random_bytes(16));
$token_hash = hash("sha256", $token);
$expiry = date("Y-m-d H:i:s", time() + 60 * 5);

// Update database
$sql_update = "UPDATE users SET reset_token_hash = ?, reset_token_expires_at = ? WHERE email = ?";
$stmt = $conn->prepare($sql_update);
$stmt->bind_param("sss", $token_hash, $expiry, $email);
$stmt->execute();

// If update succeeded, send reset email
if ($conn->affected_rows) {
    $mail = require __DIR__ . "/mailer.php";
    
    $mail->setFrom("noreply@playmahjong.com");
    $mail->addAddress($email);
    $mail->Subject = "Password Reset";
    $mail->Body = <<<END
    
    <h3>Play Mahjong: Reset Your Password</h3>
    <b><a href="https://bg2fl9fa.infinityfree.com/enter-new-password.php?token=$token">Click here to reset your password.</a></b>
    <br/>If you did not request a password reset, you can safely ignore this email.
    <br/><br/>
    This link will expire in 5 minutes.

    END;

    try {
        $mail->send();
    } catch (Exception $e) {
        echo ("The message could not be sent. Mailer error: {$mail->ErrorInfo}");
    }
}

// Close connection
$stmt->close();
$conn->close();

// Get current name of React-generated CSS file and store as URL
$url = "";
$ext = ".css";
$dir = "assets/";
if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {
            if (str_contains($file, $ext)) {
                $url = $file;
            }
        }
    }
}

// Redirect to homepage after five seconds
header("refresh:5;url=https://mahjong-seven-sage.vercel.app/")
?>
<!DOCTYPE html>
<html>
<head>
    <title>Reset Password</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="assets/<?php echo $url; ?>">
    <script type="text/javascript">
    function isDark() {
        if (localStorage.getItem("dark-mode") === '🌙') {
            const elem = document.getElementById("main-body");
            elem.setAttribute("data-dark-mode", "true");
        }
    }
    window.onload = isDark;
    </script>
</head>

<body id="main-body" onload="isDark();" data-dark-mode="false">
    <div class="center-block">
        <div class="tile-header">
            <div class="Mahjongtile">
                <p>MAH JONG</p>
            </div>
            <h1>&nbsp;Reset Password</h1>
        </div>

        <br/>
        <div>
            <p style="font-size: 18px;"><b>Success!</b> We've sent an email to your inbox.</p>
            <p style="font-size: 18px;">Please be sure to check your spam folder<br/>if you don't see it in your regular inbox.</p>
            <br/>
            <p style="font-size: 18px;">You will be redirected to the homepage in about 5 seconds.</p>
            <br/>
        </div>

        <div class="back-home">
            <a href="https://mahjong-seven-sage.vercel.app/">
                <span class="back-button">&#8617;</span>Back to Homepage
            </a>
        </div>
    </div>
</body>
</html>