<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

$servername = "localhost";
$username = "ishtiaqa";
$password = "50396947";
$dbname = "cse442_2025_spring_team_ad_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

$requestData = json_decode(file_get_contents('php://input'), true);

if (!isset($requestData['user1']) || !isset($requestData['user2'])) {
    echo json_encode(["success" => false, "message" => "Missing required parameters."]);
    exit();
}

$user1 = $requestData['user1'];
$user2 = $requestData['user2'];

try {
    $query = "DELETE FROM friends WHERE 
              (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("iiii", $user1, $user2, $user2, $user1);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Friend removed successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "No friendship found to delete."]);
    }

    $stmt->close();
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error removing friend."]);
}

$conn->close();
?>