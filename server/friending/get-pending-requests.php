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

