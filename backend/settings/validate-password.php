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
$acct_username = $conn->real_escape_string($data['user']);
$acct_password = $data['pass'];


// Get user data from database
$sql = "SELECT * FROM users WHERE name = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $acct_username);
$stmt->execute();
$result = $stmt->get_result();


// Check that data was retrieved and passwords match
if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
    if ($data != null) {
        if (password_verify($acct_password, $data['password'])) {
            echo json_encode([
                "success" => true,
                "message" => "Passwords match",
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid password"]);
        }
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}

$stmt->close();
$conn->close();
?>