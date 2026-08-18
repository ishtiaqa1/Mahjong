import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./page-styles/LoginPage.css";
import { login } from "../api.js";

export default function LoginPage({ setUsername }) {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await login(formData.identifier, formData.password);

      if (response.success) {
        localStorage.setItem("username", response.user.name); // Save username
        localStorage.setItem("userid", response.user.id); // Save username
        setUsername(response.user.name); // Update state
        navigate("/");
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="tile-header">
        <div className="Mahjongtile">
          <p>MAH JONG</p>
        </div>
        <h1>Login</h1>
      </div>

      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <label><b>Username/Email Address</b></label>
          <input
            type="text"
            name="identifier"
            className="login-input"
            placeholder="Enter your username or email"
            value={formData.identifier}
            onChange={handleChange}
            required
          />
          <label><b>Password</b></label>
          <input
            type="password"
            name="password"
            className="login-input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="forgot-password">
          <Link to="/forgot-password"><u>Forgot Password?</u></Link>
          </div>
          <button type="submit" className="account-button">LOGIN</button>
        </form>
        <Link to="/" className="back-home">
          <span className="back-button">&#8617;</span> Back to Homepage
        </Link>
        <p className="signup-text">
          Don't have an account? <Link to="/signup">Create one here</Link>
        </p>
      </div>
    </div>
  );
}