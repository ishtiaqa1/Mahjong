<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

$servername = "localhost";
$username = "ishtiaqa";  // Your MySQL username
$password = "50396947";      // Your MySQL password
$dbname = "cse442_2025_spring_team_ad_db"; // Your MySQL database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

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