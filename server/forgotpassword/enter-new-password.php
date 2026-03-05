<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Establish connection to MySQL
$servername = "localhost";
$username = "ishtiaqa";  // Your MySQL username
$password = "50396947";      // Your MySQL password
$dbname = "cse442_2025_spring_team_ad_db"; // Your MySQL database name

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Check if token exists and is still valid
$token = $_GET["token"];
$token_hash = hash("sha256", $token);

$sql_update = "SELECT * FROM users WHERE reset_token_hash = ?";
$stmt = $conn->prepare($sql_update);
$stmt->bind_param("s", $token_hash);
$stmt->execute();

$result = $stmt->get_result();
$user = $result->fetch_assoc();

// If token has expired, give expired link, redirect to homepage, and quit
if ($user === null) {
    header("Location: https://se-dev.cse.buffalo.edu/CSE442/2025-Spring/cse-442ad/expired.php");
    exit();
} elseif (strtotime($user["reset_token_expires_at"]) <= time()) {
    header("Location: https://se-dev.cse.buffalo.edu/CSE442/2025-Spring/cse-442ad/expired.php");
    exit();
}

// Token is valid, proceed to password update process

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

        <div class="flex-text">
            <p>Please enter your new password, then re-enter the same password to confirm it.</p>
        </div>

        <form method="post" action="update-new-password.php" onsubmit=" return checkPass(this) ">
            <input type="hidden" name="token" value="<?= htmlspecialchars($token) ?>">

            <label for="password"><b>&nbsp;&nbsp;New Password</b></label>
            <input type="password" id="password" name="password" class="account-info" placeholder="New Password" required />
            
            <br/><br/>

            <label for="confirm_pass"><b>&nbsp;&nbsp;Confirm New Password</b></label>
            <input type="password" id="confirm_pass" name="confirm_pass" class="account-info" placeholder="Confirm New Password" required />
            <br/><br/>

            <div id="mismatch-warning" style="visibility:hidden">
            <p><b>Your passwords must be identical.</b></p>
            </div>

            <button class="account-button">SUBMIT NEW PASSWORD</button>
        </form>

        <script type="text/javascript">
        // Confirm passwords match before allowing form to submit
        function checkPass() {
            var pass = document.getElementById("password").value;
            var conpass = document.getElementById("confirm_pass").value;
            if (pass !== conpass) {
                document.getElementById("mismatch-warning").style.visibility="visible";
                return false;
            }
            return true;
        }
        </script>

        <div class="back-home">
            <a href="https://se-dev.cse.buffalo.edu/CSE442/2025-Spring/cse-442ad/">
                <span class="back-button">&#8617;</span>Back to Homepage
            </a>
        </div>
    </div>
</body>
</html>