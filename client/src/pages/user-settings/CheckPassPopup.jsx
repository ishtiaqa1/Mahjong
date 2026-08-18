import React, { useState } from 'react';
import { validatePassword } from "../../api.js";

export default function CheckPassPopup(props) {
    const [error, setError] = useState("");
    const [passForm, setPassForm] = useState({ user: localStorage.getItem("username"), pass: "" });

    const handlePassChange = (e) => {
        setError("");
        setPassForm({ ...passForm, [e.target.name]: e.target.value });
    };

    const handleValidatePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await validatePassword(passForm.user, passForm.pass);
            setError("");

            if (response.success) {
                setPassForm({ user: localStorage.getItem("username"), pass: "" });
                props.setEffect(true);
                props.setTrigger(false);
                return true;
            } else {
                setError("Incorrect password");
                return false;
            }
        } catch (error) {
            console.error("Error validating password: ", error);
            return false;
        }
    }

    const handleClose = () => {
        setError("");
        setPassForm({ user: localStorage.getItem("username"), pass: "" });
        props.setEffect(false);
        props.setTrigger(false);
    }


    return (props.trigger) ? (
        <div className='game-popup'>
            <div className='game-popup-contents'>
                <button className='game-popup-close-button' onClick={() => handleClose()} >&#x2716;</button>
                <h2 className='settings-popup-header'>Enter your current password</h2>

                <form onSubmit={(e) => handleValidatePassword(e)}>
                    <input type="hidden" name="user" value={passForm.user} />
                    <input
                        className="settings-popup-input"
                        type="password"
                        name="pass"
                        id="pass"
                        defaultValue=""
                        placeholder="Current Password"
                        onChange={handlePassChange}
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