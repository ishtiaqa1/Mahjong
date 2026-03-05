<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: multipart/form-data');

ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "sql207.infinityfree.com ";
$username = "if0_39875569";
$password = "50396947";
$dbname = "if0_39875569_data";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) { die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error])); }

if($_FILES['image']['size'] == 0){ die(json_encode(["success" => false, "message" => "Image size must be under 1MB."])); }


$temp_path = $_FILES['image']['tmp_name'];
$file_ext = $_FILES['image']['type'];
$real_path = "/data/web/CSE442/2025-Spring/cse-442ad/profile-pictures/" . strval($_POST['id']) . "." . substr($file_ext, 6);
if(!move_uploaded_file($temp_path, $real_path)){ die(json_encode(["success" => false, "message" => "Error storing image on server."])); }

$sql = "UPDATE users SET pfp_path = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $real_path, $_POST['id']);
$stmt->execute();

echo json_encode([
    "success" => true,
    "message" => "Successfully stored image on server!",
    "filepath" => $real_path
]);

?>
