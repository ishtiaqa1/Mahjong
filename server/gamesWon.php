<?php

header("Content-Type: application/json");

$servername = "sql207.infinityfree.com ";
$username = "if0_39875569";
$password = "50396947";
$dbname = "if0_39875569_data";

// Connect to MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data["user_id"]) || empty($data["user_id"])) {
    http_response_code(400);
    die(json_encode(["success" => false, "message" => "Missing user_id"]));
}

$user_id = intval($data["user_id"]);

// Check if user exists
$sql = "SELECT games_won FROM user_games WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // User exists, update games won
    $stmt->close(); // Close previous statement
    $sql = "UPDATE user_games SET games_won = games_won + 1 WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
} else {
    // New user, insert record
    $stmt->close(); // Close previous statement
    $sql = "INSERT INTO user_games (user_id, games_played, games_won) VALUES (?, 0, 1)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
}

// Close statement and connection
$stmt->close();
$conn->close();

echo json_encode(["success" => true, "message" => "Games won updated"]);
?>