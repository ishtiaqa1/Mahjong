<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
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

if (!isset($requestData['userId']) || !isset($requestData['requesterId'])) {
    echo json_encode(["success" => false, "message" => "Missing required parameters."]);
    exit();
}

$userId = $requestData['userId'];
$requesterId = $requestData['requesterId'];

$query = "DELETE FROM requests WHERE user = ? AND request = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $requesterId, $userId);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(['success' => true, 'message' => 'Friend request deleted']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to delete request']);
}

$stmt->close();
$conn->close();
?>
