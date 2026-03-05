<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "sql207.infinityfree.com ";
$username = "if0_39875569";
$password = "50396947";
$dbname = "if0_39875569_data";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) { die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error])); }

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