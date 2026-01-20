import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./page-styles/Signup.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required!');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('https://jokersmahjong.gamer.gd/htdocs/signup.php', formData);

      if (response.data.success) {
        setSuccess('User registered successfully!');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        setError(response.data.message || 'Error during signup!');
      }
    } catch (error) {
      setError('There was an error with the request.');
    }
  };

  return (
      <div className="signup-container">
        <div className="signup-header">
          <div className="Mahjongtile">
            <p>MAH JONG</p>
          </div>
          <h1>Create An Account</h1>
        </div>

        <div className="signup-box">
          <form onSubmit={handleSubmit} id="signup-form">
            <div className="signup-text">
            <div className="user-and-pass">
              <label><b>Username</b></label>
              <input
                  className="signup-input"
                  type="text"
                  placeholder="Username"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
              />
              <label><b>Password</b></label>
              <input
                  className="signup-input"
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
              />
            </div>
            <div className="email-and-pass">
              <label><b>E-mail Address</b></label>
              <input
                  className="signup-input"
                  type="text"
                  placeholder="E-mail Address"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
              />
              <label><b>Confirm Password</b></label>
              <input
                  className="signup-input"
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
              />
            </div>
            </div>
              <div className="checkbox">
                <label>
                  <input
                      type="checkbox"
                  />
                  Subscribe to game updates
                </label>
                <label>
                  <input
                      type="checkbox"
                  />
                  I agree to the Terms & Conditions
                </label>
              </div>
            <button type="submit" className="account-button">SUBMIT</button>
          </form>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          <Link to="/" className="back-home">
            <span className="back-button">&#8617;</span> Back to Homepage
          </Link>
          <p className="login-text">
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
        </div>
      </div>
  );
}
