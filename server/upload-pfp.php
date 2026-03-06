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
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/db.php';

if($_FILES['image']['size'] == 0){ die(json_encode(["success" => false, "message" => "Image size must be under 1MB."])); }


$temp_path = $_FILES['image']['tmp_name'];
$file_ext = $_FILES['image']['type'];
$real_path = $_SERVER['DOCUMENT_ROOT'] . "/profile-pictures/" . strval($_POST['id']) . "." . substr($file_ext, 6);
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
