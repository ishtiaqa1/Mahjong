<?php
$servername = "sql210.infinityfree.com";
$username = "if0_41315567";
$password = "YOUR_PASSWORD";
$dbname = "YOUR_DBNAME";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}
?>