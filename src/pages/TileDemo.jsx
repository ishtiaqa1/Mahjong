import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";

import BaseTiles from "./gameplay/BaseTiles.jsx";
import TestTiles from "./gameplay/TestTiles.jsx";
import DropBox from "./gameplay/DropBox.jsx";
import SwapBox from "./gameplay/SwapBox.jsx";
import ScoreCard from "./gameplay/ScoreCard.jsx";
import Tile from "./gameplay/Tile.jsx";
import TileCounter from "./gameplay/TileCounter.jsx";

import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";

import "/src/index.css";
import "./page-styles/TileDemo.css";


export default function TileDemo() {
    //#region All const variable decclarations
    const username = localStorage.getItem("username");
    const [tiles, setTiles] = useState([]);
    const [discarded, setDiscarded] = useState([]);
    const [toDiscard, setToDiscard] = useState([]);
    const [tileCounts, setTileCounts] = useState({  // Holds how many of each tile have been discarded
        "1 Dot": 0, "2 Dot": 0, "3 Dot": 0, "4 Dot": 0, "5 Dot": 0, "6 Dot": 0, "7 Dot": 0, "8 Dot": 0, "9 Dot": 0,
        "1 Bam": 0, "2 Bam": 0, "3 Bam": 0, "4 Bam": 0, "5 Bam": 0, "6 Bam": 0, "7 Bam": 0, "8 Bam": 0, "9 Bam": 0,
        "1 Crack": 0, "2 Crack": 0, "3 Crack": 0, "4 Crack": 0, "5 Crack": 0, "6 Crack": 0, "7 Crack": 0, "8 Crack": 0, "9 Crack": 0,
        "North": 0, "East": 0, "West": 0, "South": 0,
        "Green Dragon": 0, "Red Dragon": 0, "White Dragon": 0,
        "Flower": 0, "Joker": 0
    });
    const blankTile = { "name": "Blank", "id": 0, "type": "blank", "locked": false };

    const [activeId, setActiveId] = useState(null);
    const [activeTile, setActiveTile] = useState(null);

    const navigate = useNavigate();

    const [showCard, setShowCard] = useState({ 0: false, 1: false, 2: false, 3: false });
    const [showCounter, setShowCounter] = useState(false);

    // Players numbered 0-3 (instead of 1-4) for modulo-based turn rotation
    const [p0Hand, setp0Hand] = useState([]);
    const [p1Hand, setp1Hand] = useState([]);
    const [p2Hand, setp2Hand] = useState([]);
    const [p3Hand, setp3Hand] = useState([]);

    const [dealer, setDealer] = useState(0);
    const [player, setPlayer] = useState(0);
    const [playerRolls, setPlayerRolls] = useState([0, 0, 0, 0]);

    // Track Joker subs across each player by name of tile they're subbing in for
    const [exposedJokers, setExposedJokers] = useState({ 0: [], 1: [], 2: [], 3: [] });

    // Current mode options are "shuffle", "deal", "draw", "call", and "discard"
    const [mode, setMode] = useState("shuffle");
    const [tileToSwap, setTileToSwap] = useState(null);  // The tile selected for swapping
    const [swapArea, setSwapArea] = useState(null);


    const [turnTimer, setTurnTimer] = useState(20); // Initial 20 seconds
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    //#endregion

    //#region Gameplay functions
   
    useEffect(() => {
        const handleTabClose = () => {
            if (username) {
                const data = new URLSearchParams({ username });
                const blob = new Blob([data], { type: 'application/x-www-form-urlencoded' });
                navigator.sendBeacon(
                    "https://jokersmahjong.gamer.gd/htdocs/update-lobby.php?action=leave",
                    blob
                );
            }
        };

        window.addEventListener("beforeunload", handleTabClose);
        return () => window.removeEventListener("beforeunload", handleTabClose);
    }, [username]);


    useEffect(() => {
        let timerInterval;
        let turnAdvanced = false; // Flag to track if the turn has been advanced
    
        if (mode === "draw" || mode === "discard") {
          setIsTimerRunning(true);
          setTurnTimer(20); // Reset the timer for the new turn
          turnAdvanced = false; // Reset the flag at the start of the turn
    
          timerInterval = setInterval(() => {
            setTurnTimer((prevTime) => {
              if (prevTime > 0) {
                return prevTime - 1;
              } else {
                // Time's up! Move to the next player
                clearInterval(timerInterval);
                setIsTimerRunning(false);
    
                if (!turnAdvanced) {
                  setMode("draw");
                  setPlayer((prevPlayer) => (prevPlayer + 1) % 4);
                  turnAdvanced = true; // Set the flag to prevent multiple advancements
                }
                return 0;
              }
            });
          }, 1000); // Update every 1 second
        } else {
          // Clear the timer when not in a turn-based mode
          clearInterval(timerInterval);
          setIsTimerRunning(false);
          setTurnTimer(20); // Reset the timer
          turnAdvanced = false; // Reset the flag when not in a turn
        }
    
        // Clean up the interval when the component unmounts or when the dependencies change
        return () => clearInterval(timerInterval);
      }, [player, mode]);
    // Restart tile demo
    const restart = () => {
        setTiles([]);
        setDiscarded([]);
        setToDiscard([]);
        setTileCounts({
            "1 Dot": 0, "2 Dot": 0, "3 Dot": 0, "4 Dot": 0, "5 Dot": 0, "6 Dot": 0, "7 Dot": 0, "8 Dot": 0, "9 Dot": 0,
            "1 Bam": 0, "2 Bam": 0, "3 Bam": 0, "4 Bam": 0, "5 Bam": 0, "6 Bam": 0, "7 Bam": 0, "8 Bam": 0, "9 Bam": 0,
            "1 Crack": 0, "2 Crack": 0, "3 Crack": 0, "4 Crack": 0, "5 Crack": 0, "6 Crack": 0, "7 Crack": 0, "8 Crack": 0, "9 Crack": 0,
            "North": 0, "East": 0, "West": 0, "South": 0,
            "Green Dragon": 0, "Red Dragon": 0, "White Dragon": 0,
            "Flower": 0, "Joker": 0
        });
        setExposedJokers({ 0: [], 1: [], 2: [], 3: [] });

        setActiveId(null);
        setActiveTile(null);
        setTileToSwap(null);

        setp0Hand([]);
        setp1Hand([]);
        setp2Hand([]);
        setp3Hand([]);

        setDealer(0);
        setPlayer(0);
        setPlayerRolls([0, 0, 0, 0]);
        setMode("shuffle");
    }



    const updateGamesPlayed = async (userId) => {
        try {  // Ensure correct key
            if (!userId) {
                console.error("User ID is missing from localStorage.");
                return;
            }

            const response = await axios.post('https://jokersmahjong.gamer.gd/htdocs/updateGames.php', {
                user_id: userId,
            });

            console.log('Games played updated:', response.data);
        } catch (error) {
            console.error('Error calling PHP script:', error.response?.data || error.message);
        }
    };
    updateGamesPlayed(localStorage.getItem("userid")).then(() => {
        console.log("Games played update attempt complete.");
    });

    const updateGamesWon = async () => {
        try {
            const userId = localStorage.getItem("userid");
            if (!userId) {
                console.error("User ID is missing from localStorage.");
                return;
            }

            const response = await axios.post('https://jokersmahjong.gamer.gd/htdocs/gamesWon.php', {
                user_id: userId,
            });

            console.log('Games won updated:', response.data);
        } catch (error) {
            console.error('Error calling PHP script:', error.response?.data || error.message);
        }
    };


    // Roll dice to determine dealer
    const rollDice = () => {
        const rolls = [
            Math.floor(Math.random() * 11) + 2,  // Player 0
            Math.floor(Math.random() * 11) + 2,  // Player 1
            Math.floor(Math.random() * 11) + 2,  // Player 2
            Math.floor(Math.random() * 11) + 2   // Player 3
        ];
        setPlayerRolls(rolls);

        // Determine dealer (highest roll, tiebreaker goes to lowest index)
        const highestRoll = Math.max(...rolls);
        const dealerIndex = rolls.indexOf(highestRoll);
        setDealer(dealerIndex);
        setPlayer(dealerIndex);
    };

    // Set specific player to dealer (gets extra 14th tile to start)
    const changeDealer = (playerNum) => {
        setDealer(playerNum);
        setPlayer(playerNum);
        setPlayerRolls([0, 0, 0, 0]);
    }

    // Shuffle all tiles
    const shuffle = async () => {
        // Using a randomly shuffled ordinary tile deck (normal gameplay):
        //const baseTiles = BaseTiles();
        //const shuffledTiles = [...baseTiles].sort(() => Math.random() - 0.5);
        //setTiles(shuffledTiles);

        // Using a fixed pre-shuffled tile deck (gameplay for our test cases):
        const testTiles = TestTiles();
        setTiles(testTiles);

        // Clear hands
        setp0Hand([]);
        setp1Hand([]);
        setp2Hand([]);
        setp3Hand([]);

        setMode("deal");
    }

    // Deal 13 tiles to all players (+14th for dealer)
    const deal = () => {
        // Ensure 152 tiles (valid indices below)
        if (tiles.length !== 152) { return; }

        // Deal tiles (currently with fixed indices, should technically start from dealer)
        setp0Hand(p0Hand => [...p0Hand,
        tiles[0], tiles[4], tiles[8], tiles[12], tiles[16], tiles[20], tiles[24],
        tiles[28], tiles[32], tiles[36], tiles[40], tiles[44], tiles[48]]
        );
        setp1Hand(p1Hand => [...p1Hand,
        tiles[1], tiles[5], tiles[9], tiles[13], tiles[17], tiles[21], tiles[25],
        tiles[29], tiles[33], tiles[37], tiles[41], tiles[45], tiles[49]]
        );
        setp2Hand(p2Hand => [...p2Hand,
        tiles[2], tiles[6], tiles[10], tiles[14], tiles[18], tiles[22], tiles[26],
        tiles[30], tiles[34], tiles[38], tiles[42], tiles[46], tiles[50]]
        );
        setp3Hand(p3Hand => [...p3Hand,
        tiles[3], tiles[7], tiles[11], tiles[15], tiles[19], tiles[23], tiles[27],
        tiles[31], tiles[35], tiles[39], tiles[43], tiles[47], tiles[51]]
        );

        // Add dealer's extra tile
        switch (dealer) {
            case 0: setp0Hand(p0Hand => [...p0Hand, tiles[52]]); break;
            case 1: setp1Hand(p1Hand => [...p1Hand, tiles[52]]); break;
            case 2: setp2Hand(p2Hand => [...p2Hand, tiles[52]]); break;
            case 3: setp3Hand(p3Hand => [...p3Hand, tiles[52]]); break;
            default: break;
        }

        // Remove dealt tiles from tile deck
        setTiles(tiles => tiles.slice(53));
        setMode("discard");
    }

    // Single player draws the top tile from the tile deck
    const draw = (setHand) => {
        if (tiles.length <= 0) {
            return navigate("/tile-demo/mahjong-draw");
        }

        const topTile = tiles[0];
        setTiles(tiles => tiles.slice(1));
        setHand(hand => [topTile, ...hand]);
        setMode("discard");
    }

    // Call discarded tile, lay down tile group
    const callTile = (hand, setHand, groupSize, playerNum) => {
        if (discarded.length <= 0) return (alert("No discarded tiles to claim."))

        const calledTile = discarded[0];
        const tilesInHand = hand.filter(tile => tile.name === calledTile.name && !tile.locked);
        const jokersInHand = hand.filter(tile => tile.name === "Joker" && !tile.locked);

        // Note: groupSize is number of tiles needed in hand to claim discarded tile
        if (tilesInHand.length + jokersInHand.length < groupSize) {
            // Definitely cannot call tile, alert player
            switch (groupSize) {
                case 2: return alert("You must have 2 identical tiles in your hand to declare Pong.");
                case 3: return alert("You must have 3 identical tiles in your hand to declare Kong.");
                case 4: return alert("You must have 4 identical tiles in your hand to declare Quint.");
                default: return alert("You cannot call this tile.");
            }
        }

        // Needs Jokers
        if (tilesInHand.length < groupSize) {
            const numJokersNeeded = groupSize - tilesInHand.length;
            const jokers = jokersInHand.slice(0, numJokersNeeded);
            const tilesToLock = [calledTile, ...tilesInHand, ...jokers];

            // Lock tiles, move to front of player's hand
            const lockedTiles = tilesToLock.map(tile => {
                return { ...tile, locked: true, groupname: calledTile.name };
            });
            const clearedHand = hand.filter(tile => !tilesToLock.includes(tile));
            setHand([...lockedTiles, ...clearedHand]);

            // Track Joker substitutes by player
            const jokerSubs = jokers.map(joker => calledTile.name);
            setExposedJokers({ ...exposedJokers, [playerNum]: [...exposedJokers[playerNum], ...jokerSubs] });
        }

        // Doesn't need Jokers
        else {
            // Lock tiles, move to front of player's hand
            const tilesToLock = [calledTile, ...tilesInHand.slice(0, groupSize)];
            const lockedTiles = tilesToLock.map(tile => { return { ...tile, locked: true }; });
            const clearedHand = hand.filter(tile => !tilesToLock.includes(tile));
            setHand([...lockedTiles, ...clearedHand]);
        }

        // Update discard and turn info
        setDiscarded(discarded => discarded.slice(1));
        setMode("discard");
    }

    // Return discard option back to player's hand
    const undoDiscard = (setHand) => {
        setHand(hand => [...hand, toDiscard[0]]);
        setToDiscard([]);
        return;
    }

    // Discard selected tile
    const confirmDiscard = () => {
        setDiscarded([toDiscard[0], ...discarded]);
        tileCounts[toDiscard[0].name] += 1;
        const tileCountsCopy = JSON.parse(JSON.stringify(tileCounts));
        setTileCounts(tileCountsCopy);

        setToDiscard([]);
        // Rotate turns and update mode
        setPlayer((player + 1) % 4);
        setMode("draw");
    }

    // Swap locked Joker with matching tile in hand
    const handleSwap = (hand, setHand, tileToSwap, setTileToSwap) => {
        if (!tileToSwap) { /*console.log("No tile to swap.");*/ return; }

        let matchedJoker = null;
        let matchedIndex = -1;
        let jokerOwner = -1;
        let jokerTile = null;

        // Find the joker in any player's exposed jokers
        for (let playerIndex = 0; playerIndex < 4; playerIndex++) {
            const jokers = exposedJokers[playerIndex];
            const jokerMatch = jokers.find(joker => joker === tileToSwap.name);
            if (jokerMatch) {
                matchedJoker = jokerMatch;
                matchedIndex = jokers.indexOf(jokerMatch);
                jokerOwner = playerIndex;
                break;
            }
        }

        if (!matchedJoker) {
            alert("No matching Joker to swap.");
            setTileToSwap(null);
            return;
        }

        // Find the joker tile from the correct hand.
        let jokerHand;
        let setJokerHand;
        switch (jokerOwner) {
            case 0: jokerHand = p0Hand; setJokerHand = setp0Hand; break;
            case 1: jokerHand = p1Hand; setJokerHand = setp1Hand; break;
            case 2: jokerHand = p2Hand; setJokerHand = setp2Hand; break;
            case 3: jokerHand = p3Hand; setJokerHand = setp3Hand; break;
            default: break;
        }

        jokerTile = jokerHand.find(tile => tile.name === "Joker" && tile.groupname === tileToSwap.name);

        // Perform the swap in the current player's hand, unlocking the joker
        const newHand = hand.map(tile =>
            tile.id === tileToSwap.id ? { ...jokerTile, locked: false } : tile
        );
        setHand(newHand);

        // Lock the swapped tile in the other player's hand
        setJokerHand(jokerHand.map(tile => {
            if (tile.id === jokerTile.id) {
                return { ...tileToSwap, locked: true, groupname: jokerTile.groupname, id: Math.random().toString(36).substring(2, 9) };
            }
            return tile;
        }));

        // Remove the joker from the original player's exposed jokers
        const updatedJokers = { ...exposedJokers };
        updatedJokers[jokerOwner] = updatedJokers[jokerOwner].filter((joker, index) => index !== matchedIndex);
        setExposedJokers(updatedJokers);

        setTileToSwap(null);
    };

    //#endregion


    //#region Display/visuals

    // Show most recently discarded tile
    const discardViewer = () => {
        if (discarded.length <= 0) {
            return;
        } else {
            return (<td>
                {discarded.slice(0, 1).map(tile => (
                  <Tile key={tile.id} tile={tile} />
                ))}
              </td>);
        }
    }

    // Track currently-moving tile
    const handleDragStart = (event, hand) => {
        setActiveId(event.active.id);
        setActiveTile(hand[hand.findIndex(tile => tile.id === event.active.id)]);
    };

    // Move to end of hand if hovering over dropbox or its held tile
    const handleDragOver = (event, setHand) => {
        const { active, over } = event;
        if (over === null) { return; }
        if (over.id === "dropbox" || over.id === "swap-box" || toDiscard.length !== 0) {
            setHand(hand => {
                const oldPos = hand.findIndex(tile => tile.id === active.id);
                const newPos = hand.findIndex(tile => tile.id === over.id);
                return arrayMove(hand, oldPos, newPos);
            })
        }
    }

    // Drop tiles in correct location after dragging
    const handleDragEnd = (event, hand, setHand) => {
        const { active, over } = event;
        setActiveId(null);
        setActiveTile(null);

        // If swapping, attempt Joker swap
        if (over.id === "swap-box") {
            if (activeTile.locked) { return; }
            setTileToSwap(activeTile);
            handleSwap(hand, setHand, activeTile, setTileToSwap);
            return;
        }

        // If discarding, remove from hand & move to dropbox
        if (over.id === "dropbox") {
            if (activeTile.locked) { return; }
            setToDiscard([hand[hand.findIndex(tile => tile.id === active.id)]]);
            setHand(hand.filter(tile => tile.id !== active.id));
            return;
        }

        // If not moving within hand, do nothing
        if (active.id === over.id) { return; }

        // Else moving within hand, rearrange as needed
        setHand(hand => {
            const oldPos = hand.findIndex(tile => tile.id === active.id);
            const newPos = hand.findIndex(tile => tile.id === over.id);
            return arrayMove(hand, oldPos, newPos);
        })
    }

    // Change top-page button based on current game mode
    const topButton = () => {
        switch (mode) {
            case "shuffle":
                return (
                    <>
                        <button className="account-button" onClick={shuffle}>SHUFFLE</button>
                        &ensp;
                        <button className="account-button" onClick={rollDice}>ROLL DICE</button>
                    </>
                );
            case "deal":
                return (<button className="account-button" onClick={deal}>DEAL</button>);
            default:
                return (
                    <>
                        <button className="account-button" onClick={restart}>RESTART</button>
                        &ensp;
                        <button className="account-button" onClick={() => setShowCounter(true)}>TILE COUNTER</button>
                        <TileCounter counts={tileCounts} trigger={showCounter} setTrigger={setShowCounter} />
                    </>
                );
        }
    }

   // Return basic horizontal header for each player
   const playerHeader = (hand, playerNum) => {
    return (
      <th>
        <b style={{ fontSize: 22 }}>Player {playerNum} {dealer === playerNum && "(D)"}</b><br />
        {player === playerNum && isTimerRunning && (
          <div style={{ color: turnTimer <= 5 ? 'red' : 'black' }}>
            Time left: {turnTimer} seconds
          </div>
        )}
        {hand.length} tiles in hand<br />
        {mode === "shuffle" && <button className="small-account-button" onClick={() => changeDealer(playerNum)}>Dealer</button>}
        {mode !== "shuffle" && mode !== "deal" &&
          <div>
            <button className="small-account-button" onClick={() => setShowCard({ ...showCard, [playerNum]: true })}>Score Card</button>
            <ScoreCard trigger={showCard[playerNum]} setTrigger={setShowCard} playerNum={playerNum} hand={hand} />
          </div>
        }
      </th>
    );
  }

    // Return current turn mechanics for each player
    const turnMechanics = (hand, setHand, playerNum) => {
        if (mode !== "shuffle" && mode !== "deal") {
            if (player !== playerNum) {
                // If not turn, just display tiles in hand
                return (
                    <DndContext collisionDetection={closestCorners} modifiers={[restrictToWindowEdges]}
                        onDragStart={(e) => handleDragStart(e, hand)}
                        onDragOver={(e) => handleDragOver(e, setHand)}
                        onDragEnd={(e) => handleDragEnd(e, hand, setHand)}>
                        <td><SortableContext items={hand} strategy={horizontalListSortingStrategy}>
                            {hand.map(tile => <Tile tile={blankTile}/>)/* Tiles are hidden when it isn't your turn */}
                            <DragOverlay>
                                {(toDiscard.length === 0 || (activeId !== toDiscard[0].id))
                                    && (activeId ? <Tile key={activeTile.id} tile={activeTile} /> : null)}
                            </DragOverlay>
                        </SortableContext></td>
                    </DndContext>
                )
            } else {
                // If turn, display hand plus relevant turn mechanics
                return (
                    <DndContext collisionDetection={closestCorners} modifiers={[restrictToWindowEdges]}
                        onDragStart={(e) => handleDragStart(e, hand)}
                        onDragOver={(e) => handleDragOver(e, setHand)}
                        onDragEnd={(e) => handleDragEnd(e, hand, setHand)}>

                        {/* Tiles in Hand */}
                        <td><SortableContext items={hand} strategy={horizontalListSortingStrategy}>
                            {hand.map(tile => <Tile key={tile.id} tile={tile} />)}
                            <DragOverlay>
                                {(toDiscard.length === 0 || (activeId !== toDiscard[0].id))
                                    && (activeId ? <Tile key={activeTile.id} tile={activeTile} /> : null)}
                            </DragOverlay>
                        </SortableContext></td>

                        {mode === "draw" &&
                            <td>
                                <button className="account-button" onClick={() => draw(setHand)}>Draw Tile</button>
                            </td>
                        }
                        {mode === "draw" && (discarded.length > 0 && discarded[0].name !== "Joker") &&
                            <td>
                                <button className="account-button" onClick={() => setMode("call")}>Call Discard</button>
                            </td>
                        }

                        {/* Declare Pong, Kong, & Quint Buttons */}
                        {mode === "call" &&
                            <td>
                                <button className="account-button"
                                    onClick={() => callTile(hand, setHand, 2, playerNum)}>Pong
                                </button>
                                &ensp;
                                <button className="account-button"
                                    onClick={() => callTile(hand, setHand, 3, playerNum)}>Kong
                                </button>
                                &ensp;
                                <button className="account-button"
                                    onClick={() => callTile(hand, setHand, 4, playerNum)}>Quint
                                </button>
                                &ensp;
                                <button className="cancel-button" onClick={() => setMode("draw")}>&#x2716;</button>
                            </td>
                        }

                        {mode === "discard" && toDiscard.length > 0 &&
                            <td>
                                <button title="Confirm discard" className="confirm-button"
                                    onClick={() => confirmDiscard()}>&#x2714;</button>
                                <button title="Undo discard" className="undo-button"
                                    onClick={() => undoDiscard(setHand)}>&#x2716;</button>
                            </td>
                        }

                        {mode === "discard" &&
                            <td>
                                <DropBox items={hand}>
                                    {toDiscard.length > 0 ? <Tile tile={toDiscard[0]} /> : <p>Drag here to discard</p>}
                                </DropBox>
                            </td>
                        }

                        {mode === "discard" &&
                            <td>
                                <SwapBox id="swap-box" onDrop={() => handleSwap(setHand)}>
                                    {tileToSwap ? <Tile tile={tileToSwap} /> : <p>Drag to swap</p>}
                                </SwapBox>
                            </td>
                        }

                    </DndContext>
                )
            }
        }
    }

    //const username = localStorage.getItem("username");

    const leaveLobby = async () => {
        try {
            const response = await fetch("https://jokersmahjong.gamer.gd/htdocs/update-lobby.php?action=leave", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `username=${username}`,
            });
        } catch (error) {
            console.error("Error leaving lobby:", error);
        }
    };



    return (
        <div>
            <div className="center-block">
                <div className="tile-header">
                    <div className="Mahjongtile">
                        <p>MAH JONG</p>
                    </div>
                    <h1>&nbsp;Tile Demo</h1>
                </div>

                <div>
                    {topButton()}

                    {mode === "shuffle" &&
                        <p style={{ marginTop: 0 }}>
                            {playerRolls.map((roll, index) => (
                                <span key={index}>
                                    Player {index}: 🎲 {roll}
                                    {index < playerRolls.length - 1 && " | "}
                                </span>
                            ))}
                        </p>
                    }
                </div>
            </div>
            
            <table className="TileDemo">
                {/* Players 0, 1, 2, 3, and Last Discarded Tile */}
                <tbody>
                    <tr>
                        {playerHeader(p0Hand, 0)}
                        {turnMechanics(p0Hand, setp0Hand, 0)}
                    </tr><tr>
                        {playerHeader(p1Hand, 1)}
                        {turnMechanics(p1Hand, setp1Hand, 1)}
                    </tr><tr>
                        {playerHeader(p2Hand, 2)}
                        {turnMechanics(p2Hand, setp2Hand, 2)}
                    </tr><tr>
                        {playerHeader(p3Hand, 3)}
                        {turnMechanics(p3Hand, setp3Hand, 3)}
                    </tr><tr>
                        <th>
                            <b style={{ fontSize: 22 }}>Last Discard</b><br />
                            {discarded.length} {discarded.length === 1 ? "tile" : "tiles"} so far
                        </th>
                        {discardViewer()}
                    </tr>
                </tbody>
            </table>

            {/* Return Button */}
            <Link to="/" className="back-home" onClick={leaveLobby}>
                <span className="back-button">&#8617;</span> Back to Homepage
            </Link>
        </div>
    );
}