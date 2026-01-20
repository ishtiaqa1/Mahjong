import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function UsernamePopup(props) {
    const [error, setError] = useState("");
    const [userForm, setUserForm] = useState({ olduser: localStorage.getItem("username"), newuser: "" });
    const navigate = useNavigate();

    const handleUserChange = (e) => {
        setError("");
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
    }

    const changeUsername = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://jokersmahjong.gamer.gd/htdocs/change-username.php",
                userForm, { headers: { "Content-Type": "application/json" } }
            );
            // console.log(response.data);
            setError("");

            if (response.data.success) {
                setUserForm({ olduser: response.data.newuser, newuser: "" });
                localStorage.setItem("username", response.data.newuser);
                props.setTrigger(false);
                navigate("/");
                return true;
            } else {
                setError("Username is unavailable");
                return false;
            }
        } catch (error) {
            console.error("Error changing username: ", error);
            return false;
        }
    }

    const handleClose = () => {
        setError("");
        setUserForm({ olduser: localStorage.getItem("username"), newuser: "" });
        props.setTrigger(false);
    }


    return (props.trigger) ? (
        <div className='game-popup'>
            <div className='game-popup-contents'>
                <h2 className='settings-popup-header'>Enter your new username</h2>
                <button className='game-popup-close-button' onClick={() => handleClose()} >&#x2716;</button>

                <form onSubmit={(e) => changeUsername(e)}>
                    <input type="hidden" name="olduser" value={userForm.olduser} />
                    <input
                        className="settings-popup-input"
                        type="text"
                        name="newuser"
                        id="newuser"
                        defaultValue=""
                        placeholder="New Username"
                        onChange={handleUserChange}
                        required
                    />
                    {error && <p className='settings-error'>{error}</p>}
                    <br />
                    <button className='game-popup-button'>SUBMIT</button>
                </form>
            </div>
        </div>
    ) : ""
}