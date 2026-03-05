<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
// Set the Content-Type for JSON response
header('Content-Type: application/json');

$servername = "sql207.infinityfree.com ";
$username = "if0_39875569";
$password = "50396947";
$dbname = "if0_39875569_data";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Get data from the request body
$data = json_decode(file_get_contents("php://input"), true);

// Sanitize input
$name = $conn->real_escape_string($data['name']);
$email = $conn->real_escape_string($data['email']);
$password = password_hash($conn->real_escape_string($data['password']), PASSWORD_DEFAULT);

// Check if any field is empty
if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "All fields are required!"]);
    exit;
}

// Check if the email already exists
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
$stmt_email->close(); // Close after use

// Check if the username already exists
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
$stmt_name->close(); // Close after use

// Insert the new user
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