import React from 'react';
import { Link } from 'react-router-dom';

export default function MahjongWin() {
    return (
        <div className="center-block">
            <h1>Draw Game</h1>
            <h3>All tiles were drawn from the deck without mahjong.</h3>

            {/* Return Button */}
            <Link to="/" className="back-home">
                <span className="back-button">&#8617;</span> Back to Homepage
            </Link>
        </div>
    )
}