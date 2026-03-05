<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

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

if (!isset($_GET['username'])) {
    echo json_encode(["success" => false, "message" => "Missing username."]);
    exit();
}

$username = $_GET['username'];

// Get email from username
$sql = "SELECT * FROM users WHERE name = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

$output = [];
$output["email"] = "";

if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
    if ($data != null) {
        $output["email"] = $data["email"];
    }
}

echo (json_encode([
    "success" => true,
    "message" => "User email found",
    "data" => $output,
]));

$stmt->close();
$conn->close();
?>