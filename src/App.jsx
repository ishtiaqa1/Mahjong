import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import "./index.css";
import DarkModeToggle from "./DarkMode.jsx";
import "./DarkMode.css"
import { heartbeat } from './heartbeat.jsx';

import AddFriends from './pages/addfriends.jsx';
import AllFriends from "./pages/AllFriendsPage.jsx";
import ForgotPassword from './pages/ForgotPassword.jsx';
import InstructionsPage from "./pages/InstructionsPage.jsx";
import LeaderboardPage from './pages/LeaderboardPage.jsx';
import LoginPage from "./pages/LoginPage.jsx";
import MahjongDraw from './pages/MahjongDraw.jsx';
import MahjongWin from './pages/MahjongWin.jsx';
import PendingRequest from './pages/PendingRequestsPage.jsx';
import ProfilePage from './pages/ProfilePage';
import Signup from "./pages/Signup.jsx";
import TileDemo from './pages/TileDemo.jsx';
import TutorialGame from './pages/tutorial-game/TutorialGame.jsx';
import TutorialWin from './pages/tutorial-game/TutorialWin.jsx';
import UserSettings from './pages/user-settings/UserSettings.jsx';
import LobbyToggle from "./lobby.jsx"

import titlescreen from "./assets/mahjong_title_screen.png";


export default function App() {
    const [username, setUsername] = useState(localStorage.getItem("username") || null);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
            heartbeat(storedUsername);     //tells the server that the user is online
        }
    }, []);

    const handleLogout = async () => {
        if (username) {
            try {
                await fetch("https://jokersmahjong.gamer.gd/htdocs/update-lobby.php?action=leave", {
                    //await fetch("http://localhost/CSE442/2025-Spring/cse-442ad/update-lobby.php?action=leave", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `username=${username}`,
                });
            } catch (error) {
                console.error("Error leaving lobby on logout:", error);
            }
        }

        // Clear localStorage and update state
        localStorage.removeItem("username");
        // localStorage.removeItem("userid");  Should find a way to prevent this being saved in localStorage; security risk
        setUsername(null);
    };


    const joinLobby = () => {
        console.log("Logged in!"); // temporary code, feel free to remove
        // ADD CODE HERE TO JOIN GAME LOBBY; CHANGE WHATEVER YOU NEED
    }

    return (
        <Router>
            <Routes>
                {/* Homepage */}
                <Route path='/' element={
                    <>
                        <div className="header">
                            <nav className="navbar">
                                <nav className="navbar-tile">
                                    <div className="Mahjongtile">
                                        <p>MAH JONG</p>
                                    </div>
                                </nav>
                                <ul>
                                    <li className="navelement"><Link to="/instructions">Instructions</Link></li>
                                    <li className="navelement"><Link to="/leaderboard">Leaderboard</Link></li>
                                    <DarkModeToggle />
                                </ul>
                            </nav>
                            <nav className="navbar">
                                <ul>
                                    {username ? (
                                        <>
                                            <li className="navelement-welcome"><span>Welcome, {username}!</span></li>
                                            <li className="navelement"><Link to="/profile">Profile</Link></li>
                                            <li className="navelement"><button className="logout-button" onClick={handleLogout}>Logout</button></li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="navelement"><Link to="/login">Login</Link></li>
                                            <li className="navelement"><Link to="/signup">Sign Up</Link></li>
                                        </>
                                    )}
                                </ul>
                            </nav>
                        </div>
                        <div className="Game">
                            <img src={titlescreen} alt="Title Screen" height="500px" width="1000px" />
                            {username ? (
                                // if logged in, button should join new lobby
                                <LobbyToggle username={username}></LobbyToggle>
                            ) : (
                                // if not logged in, button should redirect to login page
                                <Link to="/login">
                                    <button>NEW GAME</button>
                                </Link>
                            )}
                            <p><i>Click to join a new multiplayer lobby!</i></p>
                        </div>
                        <div className="center-block">
                            <Link to='/tile-demo'>
                                <button className="account-button">TILE DEMO</button>
                            </Link>
                        </div>
                    </>
                }>
                </Route>

                {/* Page Routes */}
                <Route path="/add-friends" element={<AddFriends />} />
                <Route path="/all-friends" element={<AllFriends />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/instructions' element={<InstructionsPage />}></Route>
                <Route path='/leaderboard' element={<LeaderboardPage />}></Route>
                <Route path='/login' element={<LoginPage setUsername={setUsername} />} />
                <Route path="/pending-requests" element={<PendingRequest />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/tile-demo' element={<TileDemo />} />
                <Route path='/tutorial-game' element={<TutorialGame />} />
                <Route path='/tutorial-game/win' element={<TutorialWin />} />
                <Route path='/user-settings' element={<UserSettings />} />

                <Route path='/tile-demo/mahjong-win' element={<MahjongWin />} />
                <Route path='/tile-demo/mahjong-draw' element={<MahjongDraw />} />

            </Routes>
        </Router>
    )
}