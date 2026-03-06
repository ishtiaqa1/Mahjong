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