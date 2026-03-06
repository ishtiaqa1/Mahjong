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
header("Content-Type: application/json");

require_once __DIR__ . '../db.php';

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
