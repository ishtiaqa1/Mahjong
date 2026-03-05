<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$lobby_file = 'lobby.json';

// Check if the file exists
if (!file_exists($lobby_file)) {
    // Initialize the lobby data with empty players and lobbies
    file_put_contents($lobby_file, json_encode(["lobbies" => []]));
}

$lobby_data = json_decode(file_get_contents($lobby_file), true);

// If JSON is not valid, reinitialize it
if ($lobby_data === null) {
    file_put_contents($lobby_file, json_encode(["lobbies" => []]));
    $lobby_data = ["lobbies" => []];
}

$action = $_GET['action'] ?? '';

// Join a Lobby
if ($action === "join" && $_SERVER['REQUEST_METHOD'] === "POST") {
    $username = $_POST['username'] ?? '';
    if (!$username) {
        echo json_encode(["error" => "Username required"]);
        exit;
    }

    // Check if the player is already in a lobby
    foreach ($lobby_data['lobbies'] as &$lobby) {
        if (in_array($username, $lobby['players'])) {
            echo json_encode(["status" => "joined", "lobby_id" => $lobby["id"], "players" => $lobby["players"]]);
            exit;
        }
    }

    // Find an available lobby
    $joinedLobby = false;
    foreach ($lobby_data['lobbies'] as &$lobby) {
        // Ensure the 'players' key exists and is an array
        if (!isset($lobby['players'])) {
            $lobby['players'] = [];
        }

        if (count($lobby['players']) < 4) {
            $lobby['players'][] = $username;
            $joinedLobby = true;
            break;
        }
    }

    // If no available lobby, create a new one
    if (!$joinedLobby) {
        $newLobbyId = count($lobby_data['lobbies']) + 1;
        $lobby_data['lobbies'][] = ["id" => $newLobbyId, "players" => [$username]];
    }

    // Save the updated lobby data
    file_put_contents($lobby_file, json_encode($lobby_data));

    echo json_encode(["status" => "joined", "lobbies" => $lobby_data["lobbies"]]);
    exit;
}

// Leave a Lobby
if ($action === "leave" && $_SERVER['REQUEST_METHOD'] === "POST") {
    $username = $_POST['username'] ?? '';
    foreach ($lobby_data['lobbies'] as $key => &$lobby) {
        // Ensure the 'players' key exists and is an array
        if (!isset($lobby['players'])) {
            $lobby['players'] = [];
        }

        if (in_array($username, $lobby['players'])) {
            $lobby['players'] = array_values(array_diff($lobby['players'], [$username]));

            // Remove empty lobbies
            if (count($lobby['players']) === 0) {
                unset($lobby_data['lobbies'][$key]);
            }

            // Save the updated lobby data
            file_put_contents($lobby_file, json_encode(["lobbies" => array_values($lobby_data['lobbies'])]));
            echo json_encode(["status" => "left", "lobbies" => array_values($lobby_data["lobbies"])]);
            exit;
        }
    }

    echo json_encode(["error" => "User not found in any lobby"]);
    exit;
}

// Get Lobby Status
if ($action === "status") {
    echo json_encode(["lobbies" => $lobby_data["lobbies"]]);
    exit;
}

// Reset Lobbies
if ($action === "reset") {
    file_put_contents($lobby_file, json_encode(["lobbies" => []]));
    echo json_encode(["status" => "reset"]);
    exit;
}

echo json_encode(["error" => "Invalid action"]);
exit;
?>
