import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function MahjongWin() {
    const location = useLocation();
    const { playerNum } = location.state;

    return (
        <div className="center-block">
            <h1>Player {playerNum} Wins</h1>
            <h3>Congratulations!</h3>

            {/* Return Button */}
            <Link to="/" className="back-home">
                <span className="back-button">&#8617;</span> Back to Homepage
            </Link>
        </div>
    )
}