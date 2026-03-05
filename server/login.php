<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins (use frontend URL in production)
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

$servername = "sql207.infinityfree.com ";
$username = "if0_39875569";
$password = "50396947";
$dbname = "if0_39875569_data";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Get input data
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    die(json_encode(["success" => false, "message" => "Invalid JSON input."]));
}

$identifier = $conn->real_escape_string($data['identifier']);
$password = $data['password'];

$sql = "SELECT * FROM users WHERE email = ? OR name = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $identifier, $identifier);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) { 
        // Update the time of the user's last server access to now (to determine if they're online later)
        $time=time();
        $sql = "UPDATE users SET last_access_time = ? WHERE name = ?"; 
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("is", $time, $identifier);
        $stmt->execute();

        echo json_encode([
            "success" => true,
            "message" => "Login successful!",
            "user" => [
                "id" => $user["id"],
                "name" => $user["name"],
                "email" => $user["email"]
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found."]);
}

$stmt->close();
$conn->close();
?>