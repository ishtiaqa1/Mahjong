import { Link } from "react-router-dom";
import "./page-styles/InstructionsPage.css";

export default function InstructionsPage() {
  return (
    <div className="instructions-main">
    <div className="instructions-container">
    <h1 className="instructions-header">How to Play Mahjong</h1>

    <div className='center-block'>
      <Link to="/tutorial-game">
        <button className="account-button">PLAY TUTORIAL GAME</button>
      </Link>
    </div>

    <div className="section">
      <h2 className="section-heading">Rules</h2>
      <p style={{ textAlign: 'center', marginLeft: 15}}>1.Once 4 players have joined the lobby the game will begin. To determine who will be the dealer all players will roll a dice. The player with the highest roll will be the dealer.</p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>2. Each player is then dealed 13 tiles, and the dealer is dealed 14 tiles. The dealer begins by discarding a tile</p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>3. The next player can then draw a tile from the rack, or draw a tile from discard if they are able to make a Pong (2 of a kinf), Kong (3 of a kind) , or a Quint (4 of a kind)</p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>4. Players can also use jokers to create Pongs, Kong, or Quints. If another player has the tile the joker is standing in for, they are able to swap that tile and take the other players joker. </p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>5. This process continues with all of the players taking turns. To win the game the first person to declare "Mahjong" by correctly creating a hand the exactly matches a hand in the scoring section below</p>

    </div>

    <div className="section">
      <h2 className="section-heading">Scoring</h2>
      <p className="section-content">
        The Tiles  are as follows:
      </p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>1-9 : numbered tiles</p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>Flower</p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>North, East, West, South</p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>White Dragon</p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>Red Dragon</p>
      <p className="section-content">
        The winning hands are as follows Add up the number on each tile to get the score of the hand:
      </p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>Colors - Identical number of cards of each suit of the same color  </p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>Combination representing the current year</p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>Even Or Odd suits </p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>Consecutive runs (tiles in increasing order)</p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>Quints: 5 of a kind</p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>Winds and Dragons </p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>Singles and pairs - contains only single or paired tiles </p>
      <p style={{ textAlign: 'center', marginLeft: 15}}>369 - includes 3 6 9</p>
    </div>

    <div className="section">
      <h2 className="section-heading">Using the App</h2>
      <p className="section-content">
      In Order to start the game press start game. Once 4 players join the game the game will begin. 
      </p>
      <p className="section-content">
      To view the possible winning hands and declare mahjong, click on the score card. To view the tiles in the discard click on the tile counter.  
      </p>
    
    </div>

    

    <Link to="/" className="back-home">
          <span className="back-button">&#8617;</span> Back to Homepage
        </Link>
  </div>
  </div>
);
};