import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { heartbeat } from "./heartbeat.jsx";

export default function LobbyToggle({ username }) {
  const [playerCount, setPlayerCount] = useState(0);
  const [lobbyCount, setLobbyCount] = useState(0); // Track the number of lobbies
  const [isConnected, setIsConnected] = useState(false);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleTabClose = () => {
      if (isConnected && username) {
        const data = new URLSearchParams({ username });
        const blob = new Blob([data], { type: 'application/x-www-form-urlencoded' });
        // Send a synchronous request to leave the lobby
        navigator.sendBeacon(
          //"http://localhost/CSE442/2025-Spring/cse-442ad/update-lobby.php?action=leave",
          "https://jokersmahjong.gamer.gd/htdocs/update-lobby.php?action=leave",
          blob
        );
      }
    };

    window.addEventListener("beforeunload", handleTabClose);
    return () => window.removeEventListener("beforeunload", handleTabClose);
  }, [isConnected, username]); // Dependencies ensure fresh values

  // Fetch player count and lobby info
  const fetchPlayerCount = async () => {
    try {
      //const response = await fetch("http://localhost/CSE442/2025-Spring/cse-442ad/update-lobby.php?action=status");
      const response = await fetch("https://jokersmahjong.gamer.gd/htdocs/update-lobby.php?action=status");
      const data = await response.json();

      if (data.lobbies) {
        let totalLobbies = data.lobbies.length;
        let isPlayerInLobby = false;
        let currentLobbyPlayers = 0;

        data.lobbies.forEach(lobby => {
          if (lobby.players.includes(username)) {
            isPlayerInLobby = true;
            currentLobbyPlayers = lobby.players.length;
            // Navigate IMMEDIATELY if full, regardless of state
            if (currentLobbyPlayers === 4) {
              navigate("/tile-demo"); // Removed dependency on isConnected
            }
          }
        });

        setPlayerCount(currentLobbyPlayers);
        setLobbyCount(totalLobbies);
        setIsConnected(isPlayerInLobby);
      }
    } catch (error) {
      console.error("Error fetching player count:", error);
    }
  };

  // This function checks if the player is in any lobby when the component loads
  const checkPlayerStatus = async () => {
    try {
      //const response = await fetch("http://localhost/CSE442/2025-Spring/cse-442ad/update-lobby.php?action=status");
      const response = await fetch("https://jokersmahjong.gamer.gd/htdocs/update-lobby.php?action=status");
      const data = await response.json();

      if (data.lobbies) {
        let isPlayerInLobby = false;
        data.lobbies.forEach(lobby => {
          if (lobby.players.includes(username)) {
            isPlayerInLobby = true;
            // If player is in a full lobby, navigate to the game
            if (lobby.players.length === 4 && isConnected) {
              navigate("/tile-demo");
            }
          }
        });

        setIsConnected(isPlayerInLobby);
      }
    } catch (error) {
      console.error("Error fetching player status:", error);
    }
  };

  // Join lobby handler
  const joinLobby = async () => {
    if (!username) {
      alert("Log in before joining!");
      return;
    }

    try {
      //const response = await fetch("http://localhost/CSE442/2025-Spring/cse-442ad/update-lobby.php?action=join", {
      const response = await fetch("https://jokersmahjong.gamer.gd/htdocs/update-lobby.php?action=join", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `username=${username}`,
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      if (data.status === "joined") {
        // Find the user's current lobby from the response
        const currentLobby = data.lobbies.find(lobby => lobby.players.includes(username));
        if (currentLobby) {
          setPlayerCount(currentLobby.players.length);
          setPlayers(currentLobby.players);
          // Check if lobby is full immediately
          if (currentLobby.players.length === 4) {
            navigate("/tile-demo");
          }
        }
        // Update lobby count based on available lobbies
        const availableLobbies = data.lobbies.filter(lobby => lobby.players.length < 4).length;
        setLobbyCount(data.lobbies.length);
        setIsConnected(true);
        sessionStorage.setItem("isConnected", "true");
      }
    } catch (error) {
      console.error("Error joining lobby:", error);
    }
  };

  // Leave lobby handler
  const leaveLobby = async () => {
    try {
      //const response = await fetch("http://localhost/CSE442/2025-Spring/cse-442ad/update-lobby.php?action=leave", {
      const response = await fetch("https://jokersmahjong.gamer.gd/htdocs/update-lobby.php?action=leave", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `username=${username}`,
      });

      if (response.ok) {
        setIsConnected(false);
        setPlayerCount(0);
        setPlayers([]);
        setLobbyCount(prev => prev - 1); // Adjust based on actual data if needed
        sessionStorage.removeItem("isConnected");
        fetchPlayerCount(); // Fetch updated data
      }
    } catch (error) {
      console.error("Error leaving lobby:", error);
    }
  };

  // Heartbeat function to check if players are still online
  const stillOnline = async () => {
    for (const name of players) {
      heartbeat(name);
    }
  };

  // Fetch player count every 3 seconds and keep the heartbeat active
  useEffect(() => {
    const interval = setInterval(fetchPlayerCount, 3000);
    const heartbeat_interval = setInterval(stillOnline, 120000);
    return () => {
      clearInterval(interval);
      clearInterval(heartbeat_interval);
    };
  }, [isConnected]);

  // Check player status on page load or refresh
  useEffect(() => {
    checkPlayerStatus();
  }, []);

  return (
      <div>
        {!isConnected ? (
            <button onClick={joinLobby}>NEW GAME</button>
        ) : (
            <button onClick={leaveLobby}>
              LEAVE LOBBY ({lobbyCount} lobbies, {playerCount}/4 players)
            </button>
        )}
      </div>
  );
}

