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
include "lobby.php";
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Mahjong\lobby;

require_once __DIR__ . '/vendor/autoload.php';

echo "Starting WebSocket server on port 59899...\n";
$server = IoServer::factory(
    new HttpServer(new WsServer(new lobby())),
    59899
);

$server->run();
?>

