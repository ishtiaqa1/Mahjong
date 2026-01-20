import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ProfilePopup from './ProfilePopup.jsx';
import UploadPFP from '../UploadPFP.jsx';
import "./page-styles/ProfilePage.css";
import { heartbeat } from "../heartbeat.jsx";


export default function ProfilePage() {
  // Friends list
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friendError, setFriendError] = useState(null);
  const [userName, setUserName] = useState("User"); // Default name
  const currentid = localStorage.getItem("userid");

  // User statistics
  const [statsError, setStatsError] = useState(null);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);
  const [rank, setRank] = useState(0);

  // Friend popup profile statistics
  const [apGamesPlayed, setAPGamesPlayed] = useState(0);
  const [apGamesWon, setAPGamesWon] = useState(0);
  const [apRank, setAPRank] = useState(0);
  const [activeProfile, setActiveProfile] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [popCoords, setPopCoords] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentid) return;

    // Fetch user name (if stored in localStorage or API)
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUserName(storedName);
      heartbeat(storedName);    // Tells the server that the user is online
    }

    const fetchFriends = async () => {
      try {
        const response = await fetch(
          `https://jokersmahjong.gamer.gd/htdocs/getfriends.php?user1=${currentid}`
        );
        if (!response.ok) throw new Error("Failed to fetch friends");

        const data = await response.json();
        setFriends(data.length > 0 ? data : []);
      } catch (error) {
        console.error("Error fetching friends:", error);
        setFriendError("Failed to load friends.");
      } finally {
        setLoading(false);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await fetch(
          `https://jokersmahjong.gamer.gd/htdocs/get-user-statistics.php?id=${currentid}`,
        );

        const query = await response.json();
        // console.log(query);
        setGamesPlayed(query.data.games);
        setGamesWon(query.data.wins);
        setRank(query.data.rank);

      } catch (error) {
        console.error("Error getting statistics: ", error);
        setStatsError("Failed to load statistics.");
      }
    }

    fetchFriends();
    fetchStats();
  }, [currentid]);

  const fetchFriendStats = async (e, userid, username) => {
    try {
      const response = await fetch(
        `https://jokersmahjong.gamer.gd/htdocs/get-statistics.php?id=${userid}`,
      );
      const query = await response.json();
      // console.log(query);
      setAPGamesPlayed(query.data.games);
      setAPGamesWon(query.data.wins);
      setAPRank(query.data.rank);
      setActiveProfile(username);
      setShowProfile(true);

    } catch (error) {
      console.error("Error getting statistics: ", error);
    }
    setPopCoords({ x: e.pageX, y: e.pageY });
  }


  const HideStats = async () => {
    const userId = localStorage.getItem("userid");
    const url = `https://jokersmahjong.gamer.gd/htdocs/hide-stats.php?userid=${userId}`;

    try {
      const res = await fetch(url);
    } catch (err) {
      console.error("Error toggling stats:", err);
    }
  }

  return (
    <div className="profile-container">

      <h1 className="profile-header">
        {userName ? `${userName}'s Profile` : "Profile"}
      </h1>
      <div className="content-container">
        <div className="left-column">
          <UploadPFP />
          <div>
            <h2 style={{ marginBottom: 0 }}>Statistics</h2>
            {statsError && <p style={{ color: "red" }}>{statsError}</p>}
            {rank > 0 ? (
              <h3 style={{ marginTop: 4, marginBottom: 12 }}>Ranked #{rank}</h3>
            ) : (
              <h3 style={{ marginTop: 4, marginBottom: 12 }}>Unranked</h3>
            )}
            <p style={{ margin: 0 }}><b>Games Won:</b> {gamesWon}</p>
            <p style={{ margin: 0 }}><b>Games Played:</b> {gamesPlayed}</p>
            {gamesWon > 0 && <p style={{ marginTop: 12, marginBottom: 0 }}><b>Win Rate:</b> {Math.round(gamesWon / gamesPlayed * 100)}%</p>}
          </div>
          <br />
          <button className="profile-button" onClick={HideStats}>Hide/UnHide Statistics</button>
          <button className="profile-button" onClick={() => navigate("/user-settings")}>User Settings</button>

        </div>

        {/* Right Column */}
        <div className="right-column">
          <h2>Your Friends</h2>
          {friendError && <p style={{ color: "red" }}>{friendError}</p>}
          {loading ? (
            <p>Loading friends...</p>
          ) : friends.length === 0 ? (
            <p>No friends found</p>
          ) : (
            <>
              {friends.slice(0, 5).map((friend) => (
                <li className='friend-list' key={friend.id}>
                  <button className="game-popup-text-button"
                    onClick={(e) => fetchFriendStats(e, friend.id, friend.name)}>
                    <div className='pfp-mini' />
                    {friend.name}
                  </button>
                </li>
              ))}

              <ProfilePopup trigger={showProfile} setTrigger={setShowProfile} style={{ left: popCoords.x, top: popCoords.y }}
                games={apGamesPlayed} wins={apGamesWon} rank={apRank} name={activeProfile} />

            </>
          )}
          <br />

          {/* Friending Buttons */}
          <button className="profile-button" onClick={() => navigate("/all-friends")}>View All Friends</button>
          <br />
          <button className="profile-button" onClick={() => navigate("/add-friends")}>Add Friends</button>
          <br />
          <button className="profile-button" onClick={() => navigate("/pending-requests")}>Pending Requests</button>
        </div>
      </div>

      {/* Return Button */}
      <Link to="/" className="back-home">
        <span className="back-button">&#8617;</span> Back to Homepage
      </Link>
    </div>
  );
}