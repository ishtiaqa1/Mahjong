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

if (!isset($_GET['user1'])) {
    echo json_encode(["success" => false, "message" => "User ID is required."]);
    exit();
}

$userId = $_GET['user1'];

$sql = "SELECT users.id, users.name
        FROM friends
        JOIN users ON friends.user2 = users.id
        WHERE friends.user1 = ?";

$stmt = $conn->prepare($sql); #using prepared statements for security 
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$friends = [];
while ($row = $result->fetch_assoc()) {
    $sql = "SELECT last_access_time FROM users WHERE name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $row["name"]);
    $stmt->execute();
    $row["online"] = time() - $stmt->get_result()->fetch_assoc()["last_access_time"] < 180;
    $friends[] = $row;
}

echo json_encode($friends);

$stmt->close();
$conn->close();
?>
