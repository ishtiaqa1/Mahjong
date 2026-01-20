<?php
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

