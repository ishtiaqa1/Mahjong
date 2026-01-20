import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import ProfilePopup from './ProfilePopup.jsx';
import "./page-styles/LoginPage.css";

export default function LeaderboardPage() {
    // Leaderboard data
    const empty = { "name": "", "id": -1, "wins": 0 }
    const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [LBD, setLBD] = useState({ 1: empty, 2: empty, 3: empty, 4: empty, 5: empty, 6: empty, 7: empty, 8: empty, 9: empty, 10: empty });
    const [error, setError] = useState("");

    // Profile popup data
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [gamesWon, setGamesWon] = useState(0);
    const [rank, setRank] = useState(0);
    const [activeProfile, setActiveProfile] = useState("");
    const [showProfile, setShowProfile] = useState(false);
    const [popCoords, setPopCoords] = useState({ x: 0, y: 0 });


    useEffect(() => { getLeaderboard() }, []);

    async function getLeaderboard() {
        try {
            const response = await axios.get("https://jokersmahjong.gamer.gd/htdocs/leaderboard.php", {
                responseType: "json",
            });
            // console.log(response.data);

            if (response.data.success) {
                setLBD(response.data.leaderboard)
            }
            else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error("Axios error:", error.response ? error.response.data : error.message);
            setError("Failed to load Leaderboard.");
        }
    }

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

    const renderLBD = (rank) => {
        return (
            <tr key={rank}>
                <th>#{rank}</th>
                <th className="leaderboard-user-column">
                    {LBD[rank].name !== "" &&
                        <button className="game-popup-text-button"
                            onClick={(e) => fetchStats(e, LBD[rank].id, LBD[rank].name)}>
                            <div className='pfp-mini' />{LBD[rank].name}
                        </button>}
                </th>
                <th>{LBD[rank].wins}</th>
            </tr>
        )
    }



    return (
        <div className="center-block">
            <div className="tile-header">
                <div className="Mahjongtile">
                    <p>MAH JONG</p>
                </div>
                <h1>&nbsp;Leaderboard</h1>
            </div>
            <br />
            <div>
                {error && <p className="error-message">{error}</p>}
            </div>

            <div className='leaderboard'>
                <table>
                    <thead>
                        <tr><th>Rank</th><th>Username</th><th># of Wins</th></tr>
                    </thead>
                    <tbody>
                        {ranks.map(rank => renderLBD(rank))}
                    </tbody>
                </table>
            </div>

            <ProfilePopup trigger={showProfile} setTrigger={setShowProfile} style={{ left: popCoords.x, top: popCoords.y }}
                games={gamesPlayed} wins={gamesWon} rank={rank} name={activeProfile} />

            <Link to="/" className="back-home">
                <span className="back-button">&#8617;</span> Back to Homepage
            </Link>
        </div>
    );
}