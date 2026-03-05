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
$acct_olduser = $conn->real_escape_string($data['olduser']);
$acct_newuser = $conn->real_escape_string($data['newuser']);


// Verify that username isn't taken
$sql_taken = "SELECT * FROM users WHERE name = ?";
$stmt_taken = $conn->prepare($sql_taken);
$stmt_taken->bind_param("s", $acct_newuser);
$stmt_taken->execute();
$result_taken = $stmt_taken->get_result();

if ($result_taken->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Username is already taken", 
        "olduser" => $acct_olduser, "newuser" => $acct_newuser]);
    $conn->close();
    exit();
} else {
    // Username available, good to go
    $sql_update = "UPDATE users SET name = ? WHERE name = ?";
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bind_param("ss", $acct_newuser, $acct_olduser);
    $stmt_update->execute();
    echo json_encode(["success" => true, "message" => "Updated to new username", 
        "olduser" => $acct_olduser, "newuser" => $acct_newuser]);

    $stmt_update->close();
}

$stmt_taken->close();
$conn->close();
?>