import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./page-styles/AddFriends.css";
import { getAllUsers, sendFriendRequest as sendFriendRequestApi } from "../api.js";


export default function ProfilePage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [loading, setLoading] = useState(false);
  const currentid = localStorage.getItem("userid");
  const navigate = useNavigate();

  // Debounce search query to optimize filtering
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();

        if (Array.isArray(data) && data.length > 0) {
          setUsers(data);
        } else {
          setError('No users found.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users.');
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const sendFriendRequest = async (requestedUserId) => {
    setLoading(true);
    try {
      const data = await sendFriendRequestApi(currentid, requestedUserId);
      if (data.success) {
        alert('Friend request sent!');
      } else {
        alert(data.message || 'Failed to send friend request.');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert('There was an error sending the friend request.');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().startsWith(debouncedSearchQuery.toLowerCase())
  );

  return (
    <div className="add-friends-main">

      {/* Sticky header for title and search bar */}
      <div className="add-friends-header">
        <h1>Add Friends</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search users..."
          className="search-bar"
        />
      </div>

      {/* Scrollable user list */}
      <div className="add-friends-container">
        {error && <p className="error-message">{error}</p>}

        {filteredUsers.length ? (
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.id || user.name} className="user-item">
                {user.name}
                <button
                  onClick={() => sendFriendRequest(user.id)}
                  className="friend-request-button"
                  disabled={loading}
                >
                  {loading ? 'Sending Request...' : 'Send Friend Request'}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Return Button */}
      <Link to="/profile" className="back-home">
        <span className="back-button">&#8617;</span> Back to Profile
      </Link>
    </div>
  );
}
