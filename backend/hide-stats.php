<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "sql207.infinityfree.com ";
$username = "if0_39875569";
$password = "50396947";
$dbname = "if0_39875569_data";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

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


