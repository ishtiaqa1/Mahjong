import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProfilePopup from './ProfilePopup.jsx';
import { heartbeat } from "../heartbeat.jsx";

export default function AllFriendsPage() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friendsError, setFriendsError] = useState(null);

  const currentid = localStorage.getItem("userid");

  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);
  const [rank, setRank] = useState(0);
  const [activeProfile, setActiveProfile] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [popCoords, setPopCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!currentid) return;

    const fetchFriends = async () => {
      heartbeat(localStorage.getItem("username"));  //tells the server that this user is currently online
      try {
        const response = await fetch(
          `https://jokersmahjong.gamer.gd/htdocs/getfriends.php?user1=${currentid}`
        );
        if (!response.ok) throw new Error("Failed to fetch friends");

        const data = await response.json();
        setFriends(data.length > 0 ? data : []);
      } catch (error) {
        console.error("Error fetching friends:", error);
        setFriendsError("Failed to load friends.");
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [currentid]);

  const removeFriend = async (friendId) => {
    try {
      const response = await fetch("https://jokersmahjong.gamer.gd/htdocs/removefriend.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user1: currentid,
          user2: friendId,
        }),
      });
  
      if (!response.ok) throw new Error("Failed to remove friend");
  
      // Remove friend from state
      setFriends((prevFriends) => prevFriends.filter((f) => f.id !== friendId));
    } catch (error) {
      console.error("Error removing friend:", error);
      setFriendsError("Could not remove friend.");
    }
  };
  

  const fetchStats = async (e, userid, username) => {
    try {
      const response = await fetch(
        `https://jokersmahjong.gamer.gd/htdocs/get-statistics.php?id=${userid}`,
      );
      const query = await response.json();
      // console.log(query);

      setGamesPlayed(query.data.games);
      setGamesWon(query.data.wins);
      setRank(query.data.rank);
      setActiveProfile(username);
      setShowProfile(true);

    } catch (error) {
      console.error("Error getting statistics: ", error);
    }
    setPopCoords({ x: e.pageX, y: e.pageY });
  }

  return (
    <div className="friends-container">
      <div style={{ marginBottom: 32 }} className="tile-header">
        <div className="Mahjongtile">
          <p>MAH JONG</p>
        </div>
        <h1>&nbsp;All Friends</h1>
      </div>

      {friendsError && <p className="error-message">{friendsError}</p>}

      {loading ? (
        <p>Loading friends...</p>
      ) : friends.length === 0 ? (
        <p>No friends found</p>
      ) : (
        <ul className="friend-list">
          {friends.map((friend) => (
            <li key={friend.id} className="friend-list">
              <button className="game-popup-text-button" onClick={(e) => fetchStats(e, friend.id, friend.name)}>
              <div className='pfp-mini' />{friend.online ? "Online: " : "Not Online: "} {friend.name}
              </button>

          {/* Remove Button */}
             <button
             className="remove-friend-button"
             onClick={() => removeFriend(friend.id)}
            >
        Remove Friend
            </button>
            </li>
          ))}
        </ul>
      )}

      <ProfilePopup trigger={showProfile} setTrigger={setShowProfile} style={{ left: popCoords.x, top: popCoords.y }}
        games={gamesPlayed} wins={gamesWon} rank={rank} name={activeProfile} />

      {/* Return Button */}
      <Link to="/profile" className="back-home">
        <span className="back-button">&#8617;</span> Back to Profile
      </Link>
    </div>
  );
}
