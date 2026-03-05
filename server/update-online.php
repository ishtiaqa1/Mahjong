<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "sql207.infinityfree.com ";
$username = "if0_39875569";
$password = "50396947";
$dbname = "if0_39875569_data";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) { die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error])); }

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) { die(json_encode(["success" => false, "message" => "Invalid JSON input."])); }
if (!isset($data["username"])) { die(json_encode(["success" => false, "message" => "Missing username."])); }
if (!isset($data["online"])) { die(json_encode(["success" => false, "message" => "Missing operation."])); }

$username = $data["username"];
$timestamp = $data["online"] ? time() : 1; //online is true if the user is still online, and false if they're disconnecting
// Set the user's access time to right now so other users will see that they're online/active
// Set the user's access time to January 1970 so other users will see that they're offline/inactive
$sql = "UPDATE users SET last_access_time = ? WHERE name = ?"; 
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $timestamp, $username);
$stmt->execute();
die(json_encode(["success"=> true, "message"=> "Heartbeat registered."]));

?>