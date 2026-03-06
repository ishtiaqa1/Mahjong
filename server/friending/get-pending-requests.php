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

if (!isset($requestData['userId'])) {
    echo json_encode(["success" => false, "message" => "Missing user ID."]);
    exit();
}

$userId = $requestData['userId'];

// Fetch users who sent friend requests to the logged-in user
$query = "SELECT users.id, users.name 
          FROM requests 
          JOIN users ON requests.user = users.id
          WHERE requests.request = ?";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$pendingRequests = [];
while ($row = $result->fetch_assoc()) {
    $pendingRequests[] = [
        "id" => $row['id'],  // ID of sender
        "name" => $row['name'] // Name of sender
    ];
}

echo json_encode($pendingRequests);

$stmt->close();
$conn->close();
?>

