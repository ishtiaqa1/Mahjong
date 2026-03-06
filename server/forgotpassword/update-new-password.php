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

// Double-check passwords !empty and matching
if ($_POST["password"] === "") {
    die("Update failed: empty password");
} elseif ($_POST["password"] !== $_POST["confirm_pass"]) {
    die("Update failed: mismatching passwords");
}

require_once __DIR__ . '/../db.php';

// Check if token exists and is still valid
$token = $_POST["token"];
$token_hash = hash("sha256", $token);

$sql_update = "SELECT * FROM users WHERE reset_token_hash = ?";
$stmt = $conn->prepare($sql_update);
$stmt->bind_param("s", $token_hash);
$stmt->execute();

$result = $stmt->get_result();
$user = $result->fetch_assoc();

// If token has expired, give expired link, redirect to homepage, and quit
if ($user === null) {
    header("Location: https://bg2fl9fa.infinityfree.com/expired.php");
    exit();
} elseif (strtotime($user["reset_token_expires_at"]) <= time()) {
    $sql_newpass = "UPDATE users SET reset_token_hash = NULL, reset_token_expires_at = NULL WHERE id = ?";
    $stmt = $conn->prepare($sql_newpass);
    $stmt->bind_param("s", $user["id"]);
    $stmt->execute();
    header("Location: https://bg2fl9fa.infinityfree.com/expired.php");
    exit();
}

// Good to go
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);
$sql_newpass = "UPDATE users SET password = ?,
                reset_token_hash = NULL, reset_token_expires_at = NULL
                WHERE id = ?";
$stmt = $conn->prepare($sql_newpass);
$stmt->bind_param("ss", $password, $user["id"]);
$stmt->execute();

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
        <div>
            <p style="font-size: 18px;"><b>Success!</b> Your password has been updated.</p>
            <p style="font-size: 18px;">You will be redirected to the homepage in about 5 seconds.</p>
        </div>
        <br/>

        <div class="back-home">
            <a href="https://mahjong-seven-sage.vercel.app/">
                <span class="back-button">&#8617;</span>Back to Homepage
            </a>
        </div>
    </div>
</body>
</html>