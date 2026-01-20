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
