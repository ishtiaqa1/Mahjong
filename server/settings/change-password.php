<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
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


// Get input data
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    die(json_encode(["success" => false, "message" => "Invalid JSON input.", "data" => $data]));
}


// Hash and update password
$acct_user = $conn->real_escape_string($data['user']);
$acct_newpass = $conn->real_escape_string(password_hash($data['newpass'], PASSWORD_DEFAULT));

$sql_newpass = "UPDATE users SET password = ? WHERE name = ?";
$stmt = $conn->prepare($sql_newpass);
$stmt->bind_param("ss", $acct_newpass, $acct_user);
$stmt->execute();

echo json_encode(["success" => true, "message" => "Updated to new password"]);


// Close connection
$stmt->close();
$conn->close();
?>