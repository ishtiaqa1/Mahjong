import React, { useState } from 'react';

import Tile from './Tile.jsx';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { useNavigate } from 'react-router-dom';

export default function ConfirmMahjong(props) {
    const [displayHand, setDisplayHand] = useState(props.displayHand);
    const [activeId, setActiveId] = useState(null);
    const [activeTile, setActiveTile] = useState(null);
    const userid = localStorage.getItem("userid");

    const navigate = useNavigate();

    const freeJokers = props.playerHand.filter(tile => tile.type === "joker" && !tile.locked);



    // Track dragged tiles
    const handleDragStart = (event) => {
        setActiveId(event.active.id);
        setActiveTile(displayHand[displayHand.findIndex(tile => tile.id === event.active.id)]);
    };

    // Move dragged tiles on drop
    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);
        setActiveTile(null);

        // If not moving, do nothing
        if (active.id === over.id) { return; }

        // Else moving within hand, rearrange as needed
        setDisplayHand(hand => {
            const oldPos = hand.findIndex(tile => tile.id === active.id);
            const newPos = hand.findIndex(tile => tile.id === over.id);
            return arrayMove(hand, oldPos, newPos);
        })
    }


    //#region Hand tile translations

    // Master function to convert player hand
    const translateMahjong = (playerHand, variance) => {

        // Winds & Flowers
        const norths = translateTileGroup(playerHand.filter(tile => (tile.type === "wind" && tile.suit === "north")
            || (tile.type === "joker" && tile.locked && tile.groupname === "North")), "N", "north", "black");
        const easts = translateTileGroup(playerHand.filter(tile => (tile.type === "wind" && tile.suit === "east")
            || (tile.type === "joker" && tile.locked && tile.groupname === "East")), "E", "east", "black");
        const wests = translateTileGroup(playerHand.filter(tile => (tile.type === "wind" && tile.suit === "west")
            || (tile.type === "joker" && tile.locked && tile.groupname === "West")), "W", "west", "black");
        const souths = translateTileGroup(playerHand.filter(tile => (tile.type === "wind" && tile.suit === "south")
            || (tile.type === "joker" && tile.locked && tile.groupname === "South")), "S", "south", "black");
        const flowers = translateTileGroup(playerHand.filter(tile => (tile.type === "flower")
            || (tile.type === "joker" && tile.locked && tile.groupname === "Flower")), "F", "flower", "black");

        // Dragons
        const whites = translateTileGroup(playerHand.filter(tile => (tile.type === "dragon" && tile.suit === "white")
            || (tile.type === "joker" && tile.locked && tile.groupname === "White Dragon")), "D", "dragon", "black");
        const greens = translateTileGroup(playerHand.filter(tile => (tile.type === "dragon" && tile.suit === "green")
            || (tile.type === "joker" && tile.locked && tile.groupname === "Green Dragon")), "D", "dragon", "green");
        const reds = translateTileGroup(playerHand.filter(tile => (tile.type === "dragon" && tile.suit === "red")
            || (tile.type === "joker" && tile.locked && tile.groupname === "Red Dragon")), "D", "dragon", "red");

        // Number Tiles
        const numbers = translateNumbers(playerHand.filter(tile => (tile.type === "number")
            || (tile.type === "joker" && tile.locked &&
                (tile.groupname.includes("Dot") || tile.groupname.includes("Bam") || tile.groupname.includes("Crack")))), variance);

        const sortedTiles = [...norths, ...easts, ...wests, ...souths,
        ...flowers, ...whites, ...greens, ...reds, ...numbers];

        return sortedTiles;
    }

    // Translate a group of all like tiles into winning combination syntax
    const translateTileGroup = (tileGroup, display, type, color) => {
        if (tileGroup.length === 0) { return []; }
        return [{ "display": display, "type": type, "count": tileGroup.length, "color": color }];
    }

    // Recursive method, handle specific breakdown of number tiles
    const translateNumbers = (numberGroup, variance) => {
        if (numberGroup.length === 0) { return []; }

        if (variance === "none") {
            // No variance, leave numbers completely as they are
            // First break down by suit
            const dots = numberGroup.filter(tile => tile.suit === 'dot'
                || (tile.type === "joker" && tile.locked && tile.groupname.includes("Dot")));
            const bams = numberGroup.filter(tile => tile.suit === 'bam'
                || (tile.type === "joker" && tile.locked && tile.groupname.includes("Bam")));
            const cracks = numberGroup.filter(tile => tile.suit === 'crack'
                || (tile.type === "joker" && tile.locked && tile.groupname.includes("Crack")));

            // Then break down by individual numbers, starting with largest tile number to reduce # function calls
            const maxDotNumber = Math.max(...dots.filter(tile => tile.type !== "joker").map(tile => tile.num));
            const maxBamNumber = Math.max(...bams.filter(tile => tile.type !== "joker").map(tile => tile.num));
            const maxCrackNumber = Math.max(...cracks.filter(tile => tile.type !== "joker").map(tile => tile.num));

            return [
                ...breakNumberGroups(dots, maxDotNumber, "black"),
                ...breakNumberGroups(bams, maxBamNumber, "green"),
                ...breakNumberGroups(cracks, maxCrackNumber, "red")
            ]

        } else {
            // Variance is matching or consecutive.
            // Recursively break down until minimum tile number hits base case of 1,
            // then pass back into this same function with "none" variance

            const minTileNumber = Math.min(...numberGroup.filter(tile => tile.type !== "joker").map(tile => tile.num));
            if (minTileNumber === 1) {
                return translateNumbers(numberGroup, "none");
            } else {
                const lowered = numberGroup.map(tile => decreaseByOne(tile));
                return translateNumbers(lowered, variance);
            }
        }
    }

    // Recursive method, breaks down groups of like-suit numbers by individual number 9 -> 1
    const breakNumberGroups = (numberGroup, start, color) => {
        if (numberGroup.length === 0) { return []; }
        if (start === 0) {
            // Base case
            return [];
        } else {
            // Recursive step
            const tiles = numberGroup.filter(tile => tile.num === start
                || (tile.type === "joker" && tile.locked && tile.groupname.includes(start.toString())));
            const translatedTiles = translateTileGroup(tiles, start.toString(), "number", color);
            return [...translatedTiles, ...breakNumberGroups(numberGroup, start - 1, color)];
        }
    }

    // Decrease a tile number by one. Used in translateNumbers() above
    const decreaseByOne = (tile) => {
        if (tile.type === "joker") {
            const nameParts = tile.groupname.split(" ");
            const newNum = parseInt(nameParts[0]) - 1;
            const newName = newNum.toString() + " " + nameParts[1];
            return { ...tile, groupname: newName };
        } else {
            const nameParts = tile.name.split(" ");
            const newNum = parseInt(nameParts[0]) - 1;
            const newName = newNum.toString() + " " + nameParts[1];
            return { ...tile, name: newName, num: newNum };
        }
    }
    //#endregion


    //#region Actual mahjong checking

    // Master function to check mahjong
    const checkMahjong = () => {
        const playerHand = translateMahjong(props.playerHand, props.winSet.variance);
        const winHand = props.winSet["contents"];
        const jokersNeeded = checkTiles(winHand, playerHand);

        if (jokersNeeded <= -1) {
            return mahjongFail();
        } else {
            if (jokersNeeded > freeJokers.length) {
                return mahjongFail();
            } else {
                return mahjongWin();
            }
        }
    }

    // Check each tile group to see if (a) exists and (b) matches
    const checkTiles = (winTiles, handTiles) => {
        const checkNorth = checkGroup(winTiles.filter(tile => tile.display === 'N'),
            handTiles.filter(tile => tile.display === 'N'));
        if (checkNorth === -1) { return -1; }

        const checkEast = checkGroup(winTiles.filter(tile => tile.display === 'E'),
            handTiles.filter(tile => tile.display === 'E'));
        if (checkEast === -1) { return -1; }

        const checkWest = checkGroup(winTiles.filter(tile => tile.display === 'W'),
            handTiles.filter(tile => tile.display === 'W'));
        if (checkWest === -1) { return -1; }

        const checkSouth = checkGroup(winTiles.filter(tile => tile.display === 'S'),
            handTiles.filter(tile => tile.display === 'S'));
        if (checkSouth === -1) { return -1; }

        const checkFlowers = checkGroup(winTiles.filter(tile => tile.display === 'F'),
            handTiles.filter(tile => tile.display === 'F'));
        if (checkFlowers === -1) { return -1; }

        const checkRed = checkGroup(winTiles.filter(tile => tile.display === 'R'),
            handTiles.filter(tile => (tile.display === 'D' && tile.color === 'red')));
        if (checkRed === -1) { return -1; }

        const checkGreen = checkGroup(winTiles.filter(tile => tile.display === 'G'),
            handTiles.filter(tile => (tile.display === 'D' && tile.color === 'green')));
        if (checkGreen === -1) { return -1; }

        const checkWhite = checkGroup(winTiles.filter(tile => tile.display === '0'),
            handTiles.filter(tile => (tile.display === 'D' && tile.color === 'white')));
        if (checkWhite === -1) { return -1; }

        const checkDragon = checkDragons(winTiles.filter(tile => tile.display === 'D'),
            handTiles.filter(tile => tile.display === 'D'));
        if (checkDragon === -1) { return -1; }

        const checkNum = checkNumbers(winTiles.filter(tile => tile.type === 'number'),
            handTiles.filter(tile => tile.type === 'number'));
        if (checkNum === -1) { return -1; }

        // If succeeded to this point, accumulate and return # of free Jokers needed
        return checkNorth + checkEast + checkWest + checkSouth + checkFlowers
            + checkRed + checkGreen + checkWhite + checkDragon + checkNum;
    }

    const checkGroup = (winGroup, handGroup) => {
        if (winGroup.length === 0 || typeof winGroup[0] === 'undefined') { return 0; }

        if (handGroup.length === 0 || typeof handGroup[0] === 'undefined' || handGroup[0].count < winGroup[0].count) {
            // Prevent Jokers for singles/pairs, check for pong and up
            if (winGroup[0].count <= 2) {
                // console.log("Failed by trying free Jokers for single/pair for winGroup:", winGroup[0]);
                return -1;
            }
            if (handGroup.length === 0 || typeof handGroup[0] === 'undefined') {
                // console.log("Passed hoping for all Jokers on winGroup:", winGroup[0]);
                return winGroup[0].count;
            }

            const jokersNeeded = winGroup[0].count - handGroup[0].count;
            if (freeJokers.length < jokersNeeded) {
                // console.log("Failed for winGroup:", winGroup[0]);
                return -1;
            } else {
                // console.log("Passed w/potential free Jokers for winGroup:", winGroup[0]);
                return jokersNeeded;
            }
        }
        // console.log("Passed without free Jokers for winGroup:", winGroup[0]);
        return 0;
    }

    const checkDragons = (winGroup, handGroup) => {
        if (winGroup.length === 0) { return 0; }

        // Sort by length, then pass each to checkGroup()
        const winBySize = [...winGroup].sort((a, b) => (a.count > b.count ? -1 : 1));
        const handBySize = [...handGroup].sort((a, b) => (a.count > b.count ? -1 : 1));

        const dragon1 = checkGroup([winBySize[0]], [handBySize[0]]);
        if (dragon1 === -1) { return -1; }

        const dragon2 = checkGroup([winBySize[1]], [handBySize[1]]);
        if (dragon2 === -1) { return -1; }

        const dragon3 = checkGroup([winBySize[2]], [handBySize[2]]);
        if (dragon3 === -1) { return -1; }

        return dragon1 + dragon2 + dragon3;
    }

    const checkNumbers = (winGroup, handGroup) => {
        if (winGroup.length === 0) { return 0; }

        // Group by suit and sort from largest to smallest number
        const winBlack = [...winGroup.filter(tile => tile.color === 'black')].sort((a, b) => ((a.num > b.num ? -1 : 1)));
        const winGreen = [...winGroup.filter(tile => tile.color === 'green')].sort((a, b) => ((a.num > b.num ? -1 : 1)));
        const winRed = [...winGroup.filter(tile => tile.color === 'red')].sort((a, b) => ((a.num > b.num ? -1 : 1)));

        const handBlack = [...handGroup.filter(tile => tile.color === 'black')].sort((a, b) => ((a.num > b.num ? -1 : 1)));
        const handGreen = [...handGroup.filter(tile => tile.color === 'green')].sort((a, b) => ((a.num > b.num ? -1 : 1)));
        const handRed = [...handGroup.filter(tile => tile.color === 'red')].sort((a, b) => ((a.num > b.num ? -1 : 1)));

        // Quick check for special odd/even cases:
        if (props.winSet.id === 710) {
            const b = checkSpecial(handBlack, 1);
            const g = checkSpecial(handGreen, 1);
            const r = checkSpecial(handRed, 1);
            if (!b || !g || !r) { return -1; }
        }
        if (props.winSet.id === 711) {
            const b = checkSpecial(handBlack, 0);
            const g = checkSpecial(handGreen, 0);
            const r = checkSpecial(handRed, 0);
            if (!b || !g || !r) { return -1; }
        }

        // Sort suits from largest to smallest length, then value of biggest number, then count of biggest number
        // If still tied, sort by value of smallest number, then count of smallest number
        const winBySize = [winBlack, winGreen, winRed].sort((a, b) =>
        ((a.length > b.length || a.length === 0 || b.length === 0) ? -1 :
            (a[0].display.localeCompare(b[0].display) ? -1 : (a[0].count > b[0].count ? -1 : (
                a.at(-1).display.localeCompare(b.at(-1).display) ? -1 : (a.at(-1).count > b.at(-1).count ? -1 : 1)
            )))));

        const handBySize = [handBlack, handGreen, handRed].sort((a, b) =>
        ((a.length > b.length || a.length === 0 || b.length === 0) ? -1 :
            (a[0].display.localeCompare(b[0].display) ? -1 : (a[0].count > b[0].count ? -1 : (
                a.at(-1).display.localeCompare(b.at(-1).display) ? -1 : (a.at(-1).count > b.at(-1).count ? -1 : 1)
            )))));

        // winBySize and handBySize are now ordered exactly the same way,
        // so we know exactly how the suits have been translated.
        // Now check the contents of each suit.
        const numbers1 = checkNumberSuit(winBySize[0], handBySize[0], winBySize[0].length - 1);
        if (numbers1 === -1) { return -1; }
        const numbers2 = checkNumberSuit(winBySize[1], handBySize[1], winBySize[1].length - 1);
        if (numbers2 === -1) { return -1; }
        const numbers3 = checkNumberSuit(winBySize[2], handBySize[2], winBySize[2].length - 1);
        if (numbers3 === -1) { return -1; }

        return numbers1 + numbers2 + numbers3;
    }

    // Number checks for win hands with odd/even conditions
    const checkSpecial = (tileGroup, modVal) => {
        if (tileGroup.length !== 1) { return false; }
        if (tileGroup.num % 2 !== modVal) { return false; }
        return true;
    }

    // Recursive method: 
    const checkNumberSuit = (winGroup, handGroup, index) => {
        if (index === -1) { return 0; }

        const winTiles = [winGroup[index]];
        const handTiles = handGroup.filter(tile => (tile.display === winTiles[0].display));

        const validate = checkGroup(winTiles, handTiles);

        if (validate === -1) {
            return -1;
        } else {
            return validate + checkNumberSuit(winGroup, handGroup, index - 1);
        }
    }
    //#endregion


    const mahjongFail = () => {
        props.setTrigger(false);
        props.setBackTrigger(false);
        return alert("Your tiles do not match the selected hand.");
    }

    const mahjongWin = () => {
        async function updateWins() {
            try {
                const response = await axios.post("https://jokersmahjong.gamer.gd/htdocs/updateWins.php?", {
                    user_id: userid
                });
                console.log(response.data);
                if (response.data.success) {
                    console.log("Player "+props.playerNum+" wins");
                }
                else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error("Axios error:", error.response ? error.response.data : error.message);
            }
        }
        updateWins();
        return navigate("/tile-demo/mahjong-win", { state: { playerNum: props.playerNum } });
    }


    return (props.trigger) ? (
        <div className='game-popup'>
            <div className='game-popup-contents'>

                <h2 style={{ marginTop: 0, marginBottom: 20 }} >Your Selected Hand</h2>
                <div className='confirm-background'>
                    <div className='scorecard-category'>{props.translateHand(props.winSet)}</div>
                </div>

                <br />

                <div className='confirm-background'>
                    <DndContext collisionDetection={closestCorners} modifiers={[restrictToWindowEdges]}
                        onDragStart={(e) => handleDragStart(e)} onDragEnd={(e) => handleDragEnd(e)}>
                        <SortableContext items={displayHand} strategy={horizontalListSortingStrategy}>
                            {displayHand.map(tile => <Tile key={tile.id} tile={tile} />)}
                            <DragOverlay>
                                {activeId ? <Tile key={activeTile.id} tile={activeTile} /> : null}
                            </DragOverlay>
                        </SortableContext>
                    </DndContext>
                </div>

                <br />
                <button className='game-popup-cancel-button' onClick={() => props.setTrigger(false)}>CANCEL</button>
                &ensp;&ensp;&ensp;&ensp;
                <button className='game-popup-button' onClick={() => checkMahjong()}>CONFIRM</button>
            </div>
        </div>
    ) : "";
}