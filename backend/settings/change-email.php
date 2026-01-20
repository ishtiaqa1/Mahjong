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
$acct_user = $conn->real_escape_string($data['user']);
$acct_newemail = $conn->real_escape_string($data['newemail']);


// Verify that email isn't taken
$sql_taken = "SELECT * FROM users WHERE email = ?";
$stmt_taken = $conn->prepare($sql_taken);
$stmt_taken->bind_param("s", $acct_newemail);
$stmt_taken->execute();
$result_taken = $stmt_taken->get_result();

if ($result_taken->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email is already in use", 
        "user" => $acct_user, "newemail" => $acct_newemail]);
    $conn->close();
    exit();
} else {
    // Email available, good to go
    $sql_update = "UPDATE users SET email = ? WHERE name = ?";
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bind_param("ss", $acct_newemail, $acct_user);
    $stmt_update->execute();
    echo json_encode(["success" => true, "message" => "Updated to new username", 
        "user" => $acct_user, "newemail" => $acct_newemail]);

    $stmt_update->close();
}

$stmt_taken->close();
$conn->close();
?>