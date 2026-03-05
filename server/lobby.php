<?php
namespace Mahjong;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

require_once __DIR__ . '/vendor/autoload.php';

class Lobby implements MessageComponentInterface {
    protected $lobbies;

    public function __construct() {
        $this->lobbies = [];
    }

    public function onOpen(ConnectionInterface $conn) {
        echo "New player connected (ID: {$conn->resourceId})\n";
        $conn->send(json_encode(["message" => "Welcome to the lobby!"]));
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true);
        if (!$data || !isset($data['action'])) return;

        $username = $data['username'] ?? '';
        if (!$username) {
            $from->send(json_encode(["error" => "Username required"]));
            return;
        }

        if ($data['action'] === "join") {
            $this->joinLobby($from, $username);
        } elseif ($data['action'] === "leave") {
            $this->leaveLobby($from, $username);
        }

        $this->broadcast();
    }

    private function joinLobby(ConnectionInterface $conn, $username) {
        // Check if already in a lobby
        foreach ($this->lobbies as &$lobby) {
            foreach ($lobby as &$player) {
                if ($player['username'] === $username) {
                    $conn->send(json_encode(["status" => "joined"]));
                    return;
                }
            }
        }

        // Find an open lobby
        foreach ($this->lobbies as &$lobby) {
            if (count($lobby) < 4) {
                $lobby[] = ["username" => $username, "conn" => $conn];
                return;
            }
        }

        // Create a new one
        $this->lobbies[] = [["username" => $username, "conn" => $conn]];
    }

    private function leaveLobby(ConnectionInterface $conn, $username) {
        foreach ($this->lobbies as $key => &$lobby) {
            foreach ($lobby as $index => $player) {
                if ($player['username'] === $username) {
                    unset($lobby[$index]);
                    if (count($lobby) === 0) unset($this->lobbies[$key]);
                    return;
                }
            }
        }
    }

    private function broadcast() {
        foreach ($this->lobbies as $lobby) {
            foreach ($lobby as $player) {
                $player['conn']->send(json_encode([
                    "lobbies" => array_map(fn($l) => array_column($l, "username"), $this->lobbies)
                ]));
            }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        echo "Player disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "Error in lobby: " . $e->getMessage() . "\n";
        $conn->close();
    }
}
?>

