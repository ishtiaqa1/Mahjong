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

header('Content-Type: application/json');
require_once __DIR__ . '/db.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = $conn->real_escape_string($data['name']);
$email = $conn->real_escape_string($data['email']);
$password = password_hash($conn->real_escape_string($data['password']), PASSWORD_DEFAULT);

if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "All fields are required!"]);
    exit;
}

$sql_check_email = "SELECT * FROM users WHERE email = ?";
$stmt_email = $conn->prepare($sql_check_email);
$stmt_email->bind_param("s", $email);
$stmt_email->execute();
$result_email = $stmt_email->get_result();

if ($result_email->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email already in use."]);
    $stmt_email->close();
    $conn->close();
    exit;
}
$stmt_email->close();

$sql_check_name = "SELECT * FROM users WHERE name = ?";
$stmt_name = $conn->prepare($sql_check_name);
$stmt_name->bind_param("s", $name);
$stmt_name->execute();
$result_name = $stmt_name->get_result();

if ($result_name->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Username already taken."]);
    $stmt_name->close();
    $conn->close();
    exit;
}
$stmt_name->close();

$sql_insert = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
$stmt_insert = $conn->prepare($sql_insert);
$stmt_insert->bind_param("sss", $name, $email, $password);

if ($stmt_insert->execute()) {
    echo json_encode(["success" => true, "message" => "User registered successfully!"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $stmt_insert->error]);
}

$stmt_insert->close();
$conn->close();
?>