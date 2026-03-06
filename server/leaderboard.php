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

require_once __DIR__ . '/db.php';

$sql = "SELECT user_id, games_won FROM user_games ORDER BY games_won DESC LIMIT 10";
$result = $conn->query($sql);
$output=[];
for ($i=1; $i<=10; $i++){
    $output[$i]["name"] = "";
    $output[$i]["id"] = -1;
    $output[$i]["wins"] = 0;
}

for($i=1; $i<=10; $i++) {
    $id_and_wins = $result->fetch_assoc();
    if($id_and_wins==null){ 
        break;
    }
    $sql = "SELECT name FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_and_wins["user_id"]);
    $stmt->execute();
    $name_search = $stmt->get_result();
    if($row = $name_search->fetch_assoc()) {
        $output[$i]["name"] = $row["name"];
        $output[$i]["id"] = $id_and_wins["user_id"];
        $output[$i]["wins"] = $id_and_wins["games_won"];
    }
}

echo (json_encode([
    "success" => true,
    "message" => "Leaderboard successfully obtained!",
    "leaderboard" => $output]));
$stmt->close();
$conn->close();
?>