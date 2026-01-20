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

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

$requestData = json_decode(file_get_contents('php://input'), true);

// Check if the necessary parameters are provided
if (!isset($requestData['userId']) || !isset($requestData['requestedId'])) {
    echo json_encode(["success" => false, "message" => "Missing required parameters."]);
    exit();
}

$userId = $requestData['userId'];
$requestedId = $requestData['requestedId'];

// Prevent sending friend requests to yourself
if ($userId === $requestedId) {
    echo json_encode(['success' => false, 'message' => 'You cannot send a friend request to yourself.']);
    exit();
}

// Check if the request already exists
$query = "SELECT * FROM requests WHERE user = ? AND request = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $userId, $requestedId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Friend request already sent']);
    $stmt->close();
    $conn->close();
    exit();
}

// Insert the new friend request into the database
$query = "INSERT INTO requests (user, request) VALUES (?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $userId, $requestedId);
$stmt->execute();

// Check if the insert was successful
if ($stmt->affected_rows > 0) {
    echo json_encode(['success' => true, 'message' => 'Friend request sent successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send friend request']);
}

$stmt->close();
$conn->close();
?>
