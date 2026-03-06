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

require_once __DIR__ . '/db.php';

$userid = isset($_GET['userid']) ? intval($_GET['userid']) : null;
if ($userid === null) {
    die(json_encode(["success" => false, "message" => "Missing user ID."]));
}

$query = $conn->prepare("SELECT Hide_stats FROM users WHERE id = ?");
$query->bind_param("i", $userid);
$query->execute();
$result = $query->get_result();

if ($result->num_rows === 0) {
    die(json_encode(["success" => false, "message" => "User not found."]));
}

$row = $result->fetch_assoc();
$current = (int)$row['Hide_stats'];

$newValue = $current === 1 ? 0 : 1;

$update = $conn->prepare("UPDATE users SET Hide_stats = ? WHERE id = ?");
$update->bind_param("ii", $newValue, $userid);

if ($update->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Stats visibility updated.",
        "new_value" => $newValue
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update stats visibility."]);
}

$query->close();
$update->close();
$conn->close();
?>


