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

// Fetch all users from the 'users' table
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Create an array to store the users
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    // Return the users as a JSON response
    echo json_encode($users);
} else {
    // Return an empty array if no users are found
    echo json_encode([]);
}

// Close the database connection
$conn->close();
?>