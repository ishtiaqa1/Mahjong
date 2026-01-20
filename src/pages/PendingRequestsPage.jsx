import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./page-styles/PendingRequests.css";


export default function PendingRequestsPage() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [error, setError] = useState(null);
  const currentid = localStorage.getItem("userid");
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentid) return;

    const fetchPendingRequests = async () => {
      try {
        const response = await fetch(
          "https://jokersmahjong.gamer.gd/htdocs/get-pending-requests.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: currentid }),
          }
        );

        if (!response.ok) throw new Error("Failed to fetch pending requests");

        const data = await response.json();
        if (Array.isArray(data)) setPendingRequests(data);
      } catch (error) {
        console.error("Error fetching pending requests:", error);
        setError("Failed to load pending requests.");
      }
    };

    fetchPendingRequests();
  }, [currentid]);

  const handleAcceptRequest = async (requesterId) => {
    try {
      const response = await fetch("https://jokersmahjong.gamer.gd/htdocs/accept-friend.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentid, requesterId }),
      });
      const data = await response.json();
      if (data.success) {
        setPendingRequests(pendingRequests.filter(req => req.id !== requesterId));
      } else {
        alert("Failed to accept request.");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDeleteRequest = async (requesterId) => {
    try {
      await fetch("https://jokersmahjong.gamer.gd/htdocs/delete-request.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentid, requesterId }),
      });
      setPendingRequests(pendingRequests.filter(req => req.id !== requesterId));
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };
  return (

    <div className="requests-container">
      <div>
        <h1>Pending Friend Requests</h1>
        {pendingRequests.length === 0 ? (
          <p>No pending requests</p>
        ) : (
          <ul>
            {pendingRequests.map((request) => (
              <li key={request.id}>
                {request.name}
                <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
                <button onClick={() => handleDeleteRequest(request.id)}>Decline</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Return Button */}
      <Link to="/profile" className="back-home">
        <span className="back-button">&#8617;</span> Back to Profile
      </Link>

    </div>
  );
}
