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

require_once __DIR__ . '/../db.php';

$requestData = json_decode(file_get_contents('php://input'), true);

if (!isset($requestData['userId']) || !isset($requestData['requesterId'])) {
    echo json_encode(["success" => false, "message" => "Missing required parameters."]);
    exit();
}

$userId = $requestData['userId'];
$requesterId = $requestData['requesterId'];

$conn->begin_transaction();

try {
    // Add friendship both ways
    $query = "INSERT INTO friends (user1, user2) VALUES (?, ?), (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("iiii", $userId, $requesterId, $requesterId, $userId);
    $stmt->execute();

    // Delete the request
    $query = "DELETE FROM requests WHERE user = ? AND request = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $requesterId, $userId);
    $stmt->execute();

    $conn->commit();
    echo json_encode(["success" => true, "message" => "Friend request accepted."]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "message" => "Error processing request."]);
}

$stmt->close();
$conn->close();
?>

