import { Link } from "react-router-dom";
import "/src/index.css";


export default function ForgotPassword() {
    return (
        <div className="center-block">
            {/* Header Content */}
            <div className="tile-header">
                <div className="Mahjongtile">
                    <p>MAH JONG</p>
                </div>
                <h1>&nbsp;Reset Password</h1>
            </div>
            <div className="flex-text">
                <p>Enter the email associated with your account.
                    We'll send you a secure link to log in and reset your password.</p>
            </div>

            {/* Email Field */}
            <form method="post" action="send-password-reset.php">
                <label><b>&nbsp;&nbsp;Email Address</b></label>
                <input
                    className="account-info"
                    type="email" name="email" id="email"
                    placeholder="Enter your email address"
                />
                <br/>
                <button className="account-button">SEND FORM</button>
            </form>

            {/* Return Button */}
            <Link to="/login" className="back-home">
                <span className="back-button">&#8617;</span> Back to Login
            </Link>
        </div>
    );
}