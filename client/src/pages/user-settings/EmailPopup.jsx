import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeEmail } from "../../api.js";

export default function EmailPopup(props) {
    const [error, setError] = useState("");
    const [emailForm, setEmailForm] = useState({ user: localStorage.getItem("username"), newemail: "" });
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setError("");
        setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
    }

    const handleChangeEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await changeEmail(emailForm.user, emailForm.newemail);
            setError("");

            if (response.success) {
                setEmailForm({ user: localStorage.getItem("username"), newemail: "" });
                props.setTrigger(false);
                navigate("/");
                return true;
            } else {
                setError("Email is unavailable");
                return false;
            }
        } catch (error) {
            console.error("Error changing email: ", error);
            return false;
        }
    }

    const handleClose = () => {
        setError("");
        setEmailForm({ user: localStorage.getItem("username"), newemail: "" });
        props.setTrigger(false);
    }


    return (props.trigger) ? (
        <div className='game-popup'>
            <div className='game-popup-contents'>
                <h2 className='settings-popup-header'>Enter your new email address</h2>
                <button className='game-popup-close-button' onClick={() => handleClose()} >&#x2716;</button>

                <form onSubmit={(e) => handleChangeEmail(e)}>
                    <input type="hidden" name="user" value={emailForm.user} />
                    <input
                        className="settings-popup-input"
                        type="text"
                        name="newemail"
                        id="newemail"
                        defaultValue=""
                        placeholder="New Email Address"
                        onChange={handleEmailChange}
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