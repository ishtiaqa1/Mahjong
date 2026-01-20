import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import CheckPassPopup from './CheckPassPopup';
import UsernamePopup from './UsernamePopup';
import EmailPopup from './EmailPopup';
import PasswordPopup from './PasswordPopup';


export default function UserSettings() {
    const username = localStorage.getItem("username");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);

    const [userPopup, showUserPopup] = useState(false);
    const [emailPopup, showEmailPopup] = useState(false);
    const [passPopup, showPassPopup] = useState(false);

    const [checkForUser, showCheckForUser] = useState(false);
    const [checkForEmail, showCheckForEmail] = useState(false);

    // Fetch current email on page load
    useEffect(() => {
        if (!username) { return; }
        const fetchEmail = async () => {
            try {
                const response = await fetch(
                    `https://jokersmahjong.gamer.gd/htdocs/fetch-email.php?username=${username}`,
                );
                const query = await response.json();
                // console.log(query);
                setEmail(query.data.email);
                setLoading(false);

            } catch (error) {
                console.error("Error getting email: ", error);
            }
        }
        fetchEmail();
    })


    return (
        <div>
            <div className="tile-header">
                <div className="Mahjongtile">
                    <p>MAH JONG</p>
                </div>
                <h1>&nbsp;User Settings</h1>
            </div>
            <br />

            <CheckPassPopup trigger={checkForUser} setTrigger={showCheckForUser} setEffect={showUserPopup} />
            <UsernamePopup trigger={userPopup} setTrigger={showUserPopup} />

            <CheckPassPopup trigger={checkForEmail} setTrigger={showCheckForEmail} setEffect={showEmailPopup} />
            <EmailPopup trigger={emailPopup} setTrigger={showEmailPopup} />

            <PasswordPopup trigger={passPopup} setTrigger={showPassPopup}/>

            <table className='settings-table'>
                <tbody>
                    <tr>
                        <td><b>Username</b><br />{username}</td>
                        <td><button className='small-profile-button' onClick={() => showCheckForUser(true)}>Edit</button></td>
                    </tr>
                    <tr>
                        <td><b>Email</b><br />{loading ? "Loading..." : email }</td>
                        <td><button className='small-profile-button' onClick={() => showCheckForEmail(true)}>Edit</button></td>
                    </tr>
                    <tr>
                        <td><b>Password</b><br />******</td>
                        <td><button className='small-profile-button' onClick={() => showPassPopup(true)}>Edit</button></td>
                    </tr>
                </tbody>
            </table>

            {/* Return Button */}
            <Link to="/profile" className="back-home">
                <span className="back-button">&#8617;</span> Back to Profile
            </Link>
        </div>

    )
}