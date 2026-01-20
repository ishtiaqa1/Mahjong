import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function PasswordPopup(props) {
    const [error, setError] = useState("");
    const [passForm, setPassForm] = useState({
        user: localStorage.getItem("username"), pass: "", newpass: "", conpass: ""
    });
    const navigate = useNavigate();

    const handleFieldChange = (e) => {
        setError("");
        setPassForm({ ...passForm, [e.target.name]: e.target.value });
    }

    const changePassword = async (e) => {
        e.preventDefault();

        // First check old password is valid
        try {
            const response = await axios.post("https://jokersmahjong.gamer.gd/htdocs/validate-password.php",
                passForm, { headers: { "Content-Type": "application/json" } }
            );
            // console.log(response.data);
            setError("");

            if (!response.data.success) {
                setError("Incorrect password");
                return false;
            }
        } catch (error) {
            console.error("Error validating password: ", error);
            return false;
        }

        // Check if passwords match
        if (passForm.newpass !== passForm.conpass) {
            setError("Passwords must match");
            return false;
        }

        // Then change to new password
        try {
            const response = await axios.post("https://jokersmahjong.gamer.gd/htdocs/change-password.php",
                passForm, { headers: { "Content-Type": "application/json" } }
            );
            // console.log(response.data);
            setError("");

            if (response.data.success) {
                setPassForm({ user: localStorage.getItem("username"), pass: "", newpass: "", conpass: "" });
                props.setTrigger(false);
                navigate("/");
                return true;
            } else {
                setError("Error changing password");
                return false;
            }
        } catch (error) {
            console.error("Error changing password: ", error);
            return false;
        }
    }

    const handleClose = () => {
        setError("");
        setPassForm({ user: localStorage.getItem("username"), pass: "", newpass: "", conpass: "" });
        props.setTrigger(false);
    }

    return (props.trigger) ? (
        <div className='game-popup'>
            <div className='game-popup-contents'>
                <h2 className='settings-popup-header'>Change password</h2>
                <button className='game-popup-close-button' onClick={() => handleClose()} >&#x2716;</button>

                <form onSubmit={(e) => changePassword(e)}>
                    <input type="hidden" name="user" value={passForm.user} />
                    <input
                        className="settings-popup-input"
                        type="password"
                        name="pass"
                        id="pass"
                        defaultValue=""
                        placeholder="Current Password"
                        onChange={handleFieldChange}
                        required
                    />
                    <input
                        className="settings-popup-input"
                        type="password"
                        name="newpass"
                        id="newpass"
                        defaultValue=""
                        placeholder="New Password"
                        onChange={handleFieldChange}
                        required
                    />
                    <input
                        className="settings-popup-input"
                        type="password"
                        name="conpass"
                        id="conpass"
                        defaultValue=""
                        placeholder="Confirm New Password"
                        onChange={handleFieldChange}
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