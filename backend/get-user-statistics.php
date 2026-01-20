<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "sql207.infinityfree.com ";
$username = "if0_39875569";
$password = "50396947";
$dbname = "if0_39875569_data";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

if (!isset($_GET['id'])) {
    echo json_encode(["success" => false, "message" => "Missing user ID."]);
    exit();
}

$id = $_GET['id'];

// Pull data by user ID from database
$sql = "SELECT * FROM user_games WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

// Initialize default values
$result = $stmt->get_result();
$output = [];
$output["games"] = 0;
$output["wins"] = 0;
$output["rank"] = 0;

// If data fetched successfully, update to real values
if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
    if ($data != null) {
        $output["games"] = $data["games_played"];
        $output["wins"] = $data["games_won"];

        // Get table length
        $sql_len = "SELECT * FROM user_games";
        $stmt_len = $conn->prepare($sql_len);
        $stmt_len->execute();
        $row_count = $stmt_len->get_result()->num_rows;

        // Get player's rank if they have one
        if ($output["wins"] > 0) {
            $sql_rank = "SELECT user_id, games_won FROM user_games ORDER BY games_won DESC";
            $stmt_rank = $conn->prepare($sql_rank);
            $stmt_rank->execute();
            $result_rank = $stmt_rank->get_result();

            for ($i = 1; $i <= $row_count; $i++) {
                $rankdata = $result_rank->fetch_assoc();
                if ($rankdata["user_id"] == $id) {
                    $output["rank"] = $i;
                    break;
                }
            }
        }
    }
}

// Return the statistics if public
echo json_encode([
    "success" => true,
    "message" => "User statistics collected",
    "data" => $output,
]);

$stmt->close();
$conn->close();
?>

