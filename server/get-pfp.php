<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/db.php';

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) { die(json_encode(["success" => false, "message" => "Invalid JSON input."])); }


if (!isset($data["id"])) { die(json_encode(["success" => false, "message" => "Missing user ID."])); }
$id_num = intval($data['id']);

$sql = "SELECT pfp_path, id FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);


$stmt->bind_param("i", $id_num);
$stmt->execute();
$result = $stmt->get_result();


if(!$result || $result->num_rows==0) { die(json_encode(["success" => false, "message" => "SQL query returned no results."])); }
$data = $result->fetch_assoc();
if(!$data['pfp_path'] || is_null($data['pfp_path']))
    die(json_encode([
        "success" => true,
        "message" => "User does not have a profile photo.",
        "filepath" => ""
    ]));

die(json_encode([
    "success" => true,
    "message" => "Successfully retrieved profile photo",
    "filepath" => $data['pfp_path']
]));

?>