import React, { useState } from "react";
import { Link } from "react-router-dom";
import { closestCorners, DndContext, DragOverlay, useDroppable } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import { isMobile } from 'react-device-detect';

import GameFunction from "./GameFunction.jsx";
import ScoreCard from "./TGScoreCard.jsx";
import TileSet from "./TileSet.jsx";
import TileCounter from "../gameplay/TileCounter.jsx";

import useSound from 'use-sound';
import sfxDiceRoll from '/src/assets/sounds/dice-roll.mp3';
import sfxTileClick from '/src/assets/sounds/tile-click.mp3';
import sfxOpenCard from '/src/assets/sounds/open-card.mp3';
import sfxCloseCard from '/src/assets/sounds/close-card.mp3';
import sfxPassStatus from '/src/assets/sounds/pass-status.mp3';
import sfxCallStatus from '/src/assets/sounds/call-status.mp3';

import "../page-styles/TutorialGame.css";

/* A note to anyone besides me who ever has to read this and its related files...
 * It's basically just switch case hell. I apologize.   - PJ
 */

const tileImages = import.meta.glob('/src/assets/MahjongTiles-Design/*.png', { eager: true });

const getTileDesign = (tileName) => {
  const nameMap = {
    "Joker": "Joker",
    "Flower": "Flower",
    "Green Dragon": "Green-Dragon",
    "Red Dragon": "Red-Dragon",
    "White Dragon": "White-Dragon",
    "North": "North",
    "South": "South",
    "East": "East",
    "West": "West"
};

  const numberMatch = tileName.match(/(\d+)\s(Dot|Bam|Crack)/);
  if (numberMatch) {
    const [_, num, type] = numberMatch;
    const expectedName = `${num}-${type}`.toLowerCase();
    
    return Object.keys(tileImages).find(path => 
      path.toLowerCase().includes(expectedName)
    );
  }

  const baseName = nameMap[tileName] || tileName.replace(/\s+/g, '-');
  return Object.keys(tileImages).find(path => {
    const fileName = path.split('/').pop().split('.')[0]; 
    return fileName.toLowerCase() === baseName.toLowerCase();
  });
};

const Tile = ({ tile, vertical }) => {
    const { attributes, listeners, isDragging, setNodeRef, transform, transition } = useSortable({ id: tile.id });
    const style = { transition, transform: CSS.Transform.toString(transform), zIndex: isDragging ? 5 : 0, opacity: isDragging ? 0.7 : 1 };
    const imagePath = getTileDesign(tile.name);
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}
            className={`TutorialTile ${vertical ? "vertical" : "horizontal"}`}>
            {imagePath && (
                <img 
                    src={tileImages[imagePath].default}
                    alt={tile.name}
                    className="tile-image"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.nextElementSibling;
                        if (fallback) fallback.style.display = 'block';
                    }}
                />
            )}
            
            <div className="tile-fallback" style={{ display: imagePath ? 'none' : 'block' }}>
                {tile.name}
                {(tile.groupname !== "" && tile.locked && tile.name === "Joker") && (
                    <div className='TileSubtitle'>
                        <div style={{ margin: 4 }} />
                        {tile.groupname}
                    </div>
                )}
            </div>
        </div>
    )
}

const DropBox = (props) => {
    const { setNodeRef, isOver } = useDroppable({ id: props.id });
    const style = {
        backgroundColor: isOver && "gray",
        zIndex: props.highlighted && 95,
    }
    return (
        <section ref={setNodeRef} style={style} className={props.className}>
            {props.contents}
        </section>
    )
}


export default function TutorialGame() {
    //#region Variable declarations
    // Drag-drop, display, and sound
    const username = localStorage.getItem("username") || "You";
    const [activeId, setActiveId] = useState(null);
    const [activeTile, setActiveTile] = useState(null);

    const [scoreCard, showScoreCard] = useState(false);
    const [tileCounter, showTileCounter] = useState(false);
    const [tileCounts, setTileCounts] = useState({
        "1 Dot": 0, "2 Dot": 0, "3 Dot": 0, "4 Dot": 0, "5 Dot": 0, "6 Dot": 0, "7 Dot": 0, "8 Dot": 0, "9 Dot": 0,
        "1 Bam": 0, "2 Bam": 0, "3 Bam": 0, "4 Bam": 0, "5 Bam": 0, "6 Bam": 0, "7 Bam": 0, "8 Bam": 0, "9 Bam": 0,
        "1 Crack": 0, "2 Crack": 0, "3 Crack": 0, "4 Crack": 0, "5 Crack": 0, "6 Crack": 0, "7 Crack": 0, "8 Crack": 0, "9 Crack": 0,
        "North": 0, "East": 0, "West": 0, "South": 0,
        "Green Dragon": 0, "Red Dragon": 0, "White Dragon": 0,
        "Flower": 0, "Joker": 0
    });

    const [highlight, updateHighlight] = useState({
        playerHidden: false, playerExposed: false, playerDivider: false, playerName: false, andyExposed: false,
        scoreCardTab: false, sortTilesTab: false, tileCounterTab: false,
        passButton: false, callButton: false,
        discardBox: false, swapBox: false, confundoButtons: false,
        pongButton: false, kongButton: false, quintButton: false, mahjongButton: false, undoCallButton: false,
    });
    const style = {
        playerHidden: { zIndex: highlight.playerHidden && 105 },
        playerExposed: { zIndex: highlight.playerExposed && 105 },
        playerDivider: { zIndex: highlight.playerDivider && 110 },
        playerName: { zIndex: highlight.playerName && 115 },
        andyExposed: { zIndex: highlight.andyExposed && 105 },
        scoreCardTab: { zIndex: highlight.scoreCardTab && 100 },
        sortTilesTab: { zIndex: highlight.sortTilesTab && 100 },
        tileCounterTab: { zIndex: highlight.tileCounterTab && 100 },
        passButton: { zIndex: highlight.passButton && 100 },
        callButton: { zIndex: highlight.callButton && 100 },
        discardBox: { zIndex: highlight.discardBox && 100 },
        swapBox: { zIndex: highlight.swapBox && 100 },
        confundoButtons: { zIndex: highlight.confundoButtons && 100 },
        pongButton: { zIndex: highlight.pongButton && 100 },
        kongButton: { zIndex: highlight.kongButton && 100 },
        quintButton: { zIndex: highlight.quintButton && 100 },
        mahjongButton: { zIndex: highlight.mahjongButton && 100 },
        undoCallButton: { zIndex: highlight.undoCallButton && 100 },
    };

    const [soundDiceRoll] = useSound(sfxDiceRoll);
    const [soundTileClick] = useSound(sfxTileClick);
    const [soundOpenCard] = useSound(sfxOpenCard);
    const [soundCloseCard] = useSound(sfxCloseCard);
    const [soundPassStatus] = useSound(sfxPassStatus);
    const [soundCallStatus] = useSound(sfxCallStatus);

    // Functionality
    const [step, setStep] = useState(0);
    const [mode, setMode] = useState("");
    const [isTurn, setIsTurn] = useState(false);

    const [drawPile, setDrawPile] = useState([...TileSet()]);
    const [currDiscard, setCurrDiscard] = useState(null);
    const [discardPile, setDiscardPile] = useState([]);
    const [toDiscard, setToDiscard] = useState(null);
    const [toSwap, setToSwap] = useState(null);

    const [downHand, setDownHand] = useState([]);
    const [leftHand, setLeftHand] = useState([]);
    const [rightHand, setRightHand] = useState([]);
    const [acrossHand, setAcrossHand] = useState([]);

    const [downStatus, setDownStatus] = useState("");
    const [leftStatus, setLeftStatus] = useState("");
    const [rightStatus, setRightStatus] = useState("");
    const [acrossStatus, setAcrossStatus] = useState("");

    const [passEnabled, setPassEnabled] = useState(false);
    const [callEnabled, setCallEnabled] = useState(false);
    const [discardEnabled, setDiscardEnabled] = useState(false);
    const [swapEnabled, setSwapEnabled] = useState(false);
    const [kongEnabled, setKongEnabled] = useState(false);
    const [mahjongEnabled, setMahjongEnabled] = useState(false);

    const [winning, setWinning] = useState(false);

    //#endregion

    const soundTileStack = async () => {
        soundTileClick();
        await delay(50);
        soundTileClick();
    }

    //#region Game functions
    // Track currently-moving tile
    const handleDragStart = (event, hand) => {
        setActiveId(event.active.id);
        if (toDiscard !== null && event.active.id === toDiscard.id) {
            setActiveTile(toDiscard);
            return;
        }
        if (toSwap !== null && event.active.id === toSwap.id) {
            setActiveTile(toSwap);
            return;
        }
        else {
            setActiveTile(hand[hand.findIndex(tile => tile.id === event.active.id)]);
            return;
        }
    }

    // Move tiles accordingly when dragged around
    const handleDragOver = (event, setHand) => {
        const { active, over } = event;
        if (active === null || over === null
            || ((toDiscard !== null && event.active.id === toDiscard.id)
                || (toSwap !== null && event.active.id === toSwap.id))) {
            return;
        }
        if (!active.id || active.id === over.id) { return; }
        if (over.id === "discard" || over.id === "joker") { return; }
        soundTileClick();
        setHand(hand => {
            const oldPos = hand.findIndex(tile => tile.id === active.id);
            const newPos = hand.findIndex(tile => tile.id === over.id);
            return arrayMove(hand, oldPos, newPos);
        })
    }

    // Drop tiles in correct location after dragging
    const handleDragEnd = (event, hand, setHand) => {
        const { active, over } = event;
        if (active === null || over === null
            || ((toDiscard !== null && event.active.id === toDiscard.id)
                || (toSwap !== null && event.active.id === toSwap.id))) {
            return;
        }
        setActiveId(null);
        setActiveTile(null);

        // If not moving, do nothing
        if (!active.id || active.id === over.id) { return; }

        // If discarding, remove from hand & move to dropbox
        if (over.id === "discard" && discardEnabled) {
            if (activeTile.locked || toDiscard !== null) { return; }
            if (step === 58 && activeTile.name !== "East") { return; }
            if (step === 94 && activeTile.name !== "1 Dot") { return; }
            if (step === 122 && activeTile.name !== "Flower") { return; }
            if (step === 135 && activeTile.name !== "7 Dot") { return; }

            setToDiscard(hand.filter(tile => tile.id === active.id)[0]);
            setHand(hand.filter(tile => tile.id !== active.id));
            setStep(step + 1);
            setMode("dconfirm");
            soundTileClick();
            return;
        }

        // If swapping, attempt Joker swap
        if (over.id === "joker" && swapEnabled) {
            if (activeTile.locked || toSwap !== null) { return; }
            if (step === 117 && activeTile.name !== "8 Bam") { return; }

            setToSwap(hand.filter(tile => tile.id === active.id)[0]);
            setHand(hand.filter(tile => tile.id !== active.id));
            setStep(step + 1);
            setMode("sconfirm");
            soundTileClick();
            return;
        }

        // Else moving within hand, rearrange as needed
        setHand(hand => {
            const oldPos = hand.findIndex(tile => tile.id === active.id);
            const newPos = hand.findIndex(tile => tile.id === over.id);
            return arrayMove(hand, oldPos, newPos);
        })
    }

    // Toggle score card, update step if appropriate
    const toggleScoreCard = (condition) => {
        if (step === 15 || step === 41) { setStep(step + 1); }
        if (!scoreCard) {
            showScoreCard(true);
            soundOpenCard();
        } else {
            showScoreCard(false);
            soundCloseCard();
        }
    }

    const toggleTileCounter = (condition) => {
        if (!tileCounter) {
            showTileCounter(true);
            soundOpenCard();
        } else {
            showTileCounter(false);
            soundCloseCard();
        }
    }

    // Reset all highlights
    const clearHighlight = () => {
        updateHighlight({
            playerHidden: false, playerExposed: false, playerDivider: false, playerName: false,
            scoreCardTab: false, sortTilesTab: false, tileCounterTab: false,
            passButton: false, callButton: false,
            discardBox: false, swapBox: false, confundoButtons: false,
        });
        return;
    }

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    // Dice roll
    const rollDice = async () => {
        setStep(4);
        soundDiceRoll();
        await delay(300); // Wait 0.3 seconds
        setDownStatus("🎲6");
        setLeftStatus("🎲11");
        setRightStatus("🎲9");
        setAcrossStatus("🎲4");
        await delay(2000); // Wait 2 seconds
        setStep(5);
    }

    // Auto-sort tiles in hand
    const sortTiles = () => {
        if (downHand.length <= 0) { return; }

        const flowers = downHand.filter(tile => tile.type === "flower");
        const winds = downHand.filter(tile => tile.type === "wind").sort((a, b) => a.id < b.id ? -1 : 1);
        const dots = downHand.filter(tile => tile.suit === "dot").sort((a, b) => a.id < b.id ? -1 : 1);
        const bams = downHand.filter(tile => tile.suit === "bam").sort((a, b) => a.id < b.id ? -1 : 1);
        const cracks = downHand.filter(tile => tile.suit === "crack").sort((a, b) => a.id < b.id ? -1 : 1);
        const dragons = downHand.filter(tile => tile.type === "dragon").sort((a, b) => a.id < b.id ? -1 : 1);
        const jokers = downHand.filter(tile => tile.type === "joker");

        soundTileStack();
        setDownHand([...flowers, ...winds, ...dots, ...bams, ...cracks, ...dragons, ...jokers]);
    }

    const draw = (hand, setHand) => {
        const drawnTile = drawPile[0];
        setHand([...hand, drawnTile]);
        setDrawPile(pile => pile.slice(1));
        soundTileClick();
        return drawnTile;
    }

    const npcDiscard = (deadTile) => {
        setCurrDiscard(deadTile);
        setToDiscard(null);
        soundTileClick();
    }

    const moveCurrToDiscardPile = (tileToMove) => {
        if (currDiscard === null) {
            setDiscardPile([...discardPile, tileToMove]);
            setTileCounts({ ...tileCounts, [tileToMove.name]: tileCounts[tileToMove.name] + 1 });
        } else {
            setDiscardPile([...discardPile, currDiscard]);
            setTileCounts({ ...tileCounts, [currDiscard.name]: tileCounts[currDiscard.name] + 1 });
        }
        setCurrDiscard(null);
        setDownStatus("");
        setLeftStatus("");
        setRightStatus("");
        setAcrossStatus("");
        soundTileClick();
    }

    // Player passes on tile, NPCs respond
    const pass = async () => {
        if (!passEnabled) { return; }
        clearHighlight();
        setPassEnabled(false);
        soundPassStatus();
        setDownStatus("Pass");
        setMode("");
        if (step < 127) {
            setStep(step + 1);
        }
        await delay(1500);
        switch (step) {
            case 34: {
                soundPassStatus();
                setRightStatus("Pass");
                await delay(1500);
                soundPassStatus();
                setAcrossStatus("Pass");
                await delay(1500);
                setStep(36);
                return;
            };
            case 68: {
                soundPassStatus();
                setAcrossStatus("Pass");
                await delay(1500);
                soundPassStatus();
                setLeftStatus("Pass");
                await delay(1500);
                setStep(70);
                return;
            };
            case 102: {
                soundCallStatus();
                setLeftStatus("Call - Pong");
                await delay(1500);
                soundCallStatus();
                setAcrossStatus("Call - Pong");
                await delay(1500);
                setStep(104);
                return;
            };
            case 108: {
                // Across has discarded "White Dragon", tile thrown out, then Left Draws
                soundPassStatus();
                setRightStatus("Pass");
                await delay(1500);
                soundPassStatus();
                setLeftStatus("Pass");
                await delay(1500);

                moveCurrToDiscardPile(currDiscard);
                await delay(1500);
                const drawnTile = draw(leftHand, setLeftHand);
                await delay(1500);

                const deadTile = leftHand[0];
                setLeftHand([...leftHand, drawnTile].filter(tile => tile.id !== deadTile.id));
                soundTileClick();
                await delay(1500);
                npcDiscard(deadTile);
                setMode("passcall");

                await delay(1500);
                setPassEnabled(true);
                setStep(110);
                return;
            };
            case 110: {
                // Left has discarded "2 Crack", tile thrown out, then Down draws
                soundPassStatus();
                setAcrossStatus("Pass");
                await delay(1500);
                soundPassStatus();
                setRightStatus("Pass");
                await delay(1500);

                moveCurrToDiscardPile(currDiscard);
                await delay(1500);

                draw(downHand, setDownHand);
                setIsTurn(true);
                setMode("discard");
                await delay(1500);

                updateHighlight({
                    ...highlight,
                    playerHidden: true,
                });
                setStep(112);
                return;
            };
            case 127: {
                soundPassStatus();
                setAcrossStatus("Pass");
                await delay(1500);
                soundPassStatus();
                setLeftStatus("Pass");
                await delay(1500);

                moveCurrToDiscardPile();
                await delay(1500);
                const drawnTile = draw(acrossHand, setAcrossHand);
                await delay(1500);

                const deadTile = acrossHand[0];
                setAcrossHand([...acrossHand.filter(tile => tile.id !== deadTile.id), drawnTile]);
                soundTileClick();
                await delay(1500);
                npcDiscard(deadTile);

                setMode("passcall");
                setPassEnabled(true);
                setStep(129);
                return;
            };
            case 129: {
                soundPassStatus();
                setRightStatus("Pass");
                await delay(1500);
                soundPassStatus();
                setLeftStatus("Pass");
                await delay(1500);

                moveCurrToDiscardPile();
                await delay(1500);
                const drawnTile = draw(leftHand, setLeftHand);
                await delay(1500);

                const deadTile = leftHand[0];
                setLeftHand([...leftHand.filter(tile => tile.id !== deadTile.id), drawnTile]);
                soundTileClick();
                await delay(1500);
                npcDiscard(deadTile);
                await delay(1500);

                setStep(131);
                return;
            };
            case 137: {
                // Right has discarded "1 Crack", tile thrown out, then Across draws & discards
                setStep(139);
                soundPassStatus();
                setAcrossStatus("Pass");
                await delay(1500);
                soundPassStatus();
                setLeftStatus("Pass");
                await delay(1500);

                moveCurrToDiscardPile(currDiscard);
                await delay(1500);
                const drawnTile = draw(acrossHand, setAcrossHand);
                await delay(1500);

                const deadTile = acrossHand[0];
                setAcrossHand([...acrossHand, drawnTile].filter(tile => tile.id !== deadTile.id));
                soundTileClick();
                await delay(1500);

                npcDiscard(deadTile);
                setMode("passcall");
                await delay(1500);
                setStep(140);
                setCallEnabled(true);
                return;
            };
        }
    }

    // Player calls tile
    const call = () => {
        if (!callEnabled) { return; }
        setMode("callopt");
        switch (step) {
            case 81: {
                updateHighlight({
                    ...highlight,
                    pongButton: true,
                    kongButton: true,
                    quintButton: true,
                    mahjongButton: true,
                    undoCallButton: true,
                });
                setStep(step + 1);
                return;
            };
            case 140: {
                setMahjongEnabled(true);
                setStep(step + 1);
                return;
            }
            default: {
                setStep(step + 1);
                return;
            }
        }
    }

    // Player decides to undo calling a tile
    const undoCall = () => {
        switch (step) {
            case 84: {
                setMode("passcall");
                setKongEnabled(false);
                updateHighlight({
                    ...highlight,
                    pongButton: false,
                    kongButton: false,
                    quintButton: false,
                    mahjongButton: false,
                    undoCallButton: false,
                    callButton: true,
                });
                setStep(81);
                return;
            };
            default: {
                return;
            }
        }
    }

    // Sets player status; rest is handled in GameFunction
    const kong = () => {
        if (!kongEnabled) { return; }
        clearHighlight();
        setKongEnabled(false);
        setMode("");
        soundCallStatus();
        setDownStatus("Call - Kong");
        setStep(step + 1);
        return;
    }

    // Sets player mahjong status; rest is GameFunction
    const mahjong = async () => {
        if (!mahjongEnabled) { return; }
        setMahjongEnabled(false);
        soundCallStatus();
        setDownStatus("Call - Mahjong");
        setMode("");
        setStep(step + 1);
        return;
    }

    // Undo discard/swap action (just move back to hand)
    const undo = () => {
        soundTileClick();
        if (toSwap !== null) {
            setDownHand([...downHand, toSwap]);
            setToSwap(null);
        }
        if (toDiscard !== null) {
            setDownHand([...downHand, toDiscard]);
            setToDiscard(null);
        }
        setMode("discard");
        setStep(step - 1);
        return;
    }

    // Confirm discard/swap action (handle on condition)
    const confirm = () => {
        clearHighlight();
        if (toSwap !== null) {
            swap();
            return;
        }
        if (toDiscard !== null) {
            discard();
            return;
        }
        console.error("Error: could not find tile to discard or swap");
        return;
    }

    // Move tile from toDiscard to currDiscard
    const discard = async () => {
        soundTileClick();
        const discardTile = toDiscard;
        setCurrDiscard(toDiscard);
        setDiscardEnabled(false);
        setToDiscard(null);
        setMode("")
        setStep(step + 1);

        if (step === 95) {
            await delay(1000);
            soundPassStatus();
            setAcrossStatus("Pass");
            await delay(1500);
            soundPassStatus();
            setRightStatus("Pass");
            await delay(1500);
            soundPassStatus();
            setLeftStatus("Pass");
            await delay(1500);

            moveCurrToDiscardPile(discardTile);
            setIsTurn(false);
            await delay(1500);

            draw(rightHand, setRightHand);
            await delay(1500);
            soundCallStatus();
            setRightStatus("Swap");
            await delay(1500);
            setStep(97);
            return;
        };
        if (step === 123) {
            await delay(1000);
            soundPassStatus();
            setLeftStatus("Pass");
            await delay(1500);
            soundPassStatus();
            setRightStatus("Pass");
            await delay(1500);
            soundPassStatus();
            setAcrossStatus("Pass");
            await delay(1500);

            moveCurrToDiscardPile(discardTile);
            setIsTurn(false);
            await delay(1500);

            setStep(125);
            return;
        };
        if (step === 136) {
            setStep(step + 1);
            await delay(1000);
            soundPassStatus();
            setAcrossStatus("Pass");
            await delay(1500);
            soundPassStatus();
            setRightStatus("Pass");
            await delay(1500);
            soundPassStatus();
            setLeftStatus("Pass");
            await delay(1500);

            moveCurrToDiscardPile(discardTile);
            setIsTurn(false);
            await delay(1500);

            const drawnTile = draw(rightHand, setRightHand);
            await delay(1500);

            const deadTile = rightHand[0];
            setRightHand([...rightHand.filter(tile => tile.id !== deadTile.id), drawnTile]);
            soundTileClick();
            await delay(1500);

            npcDiscard(deadTile);
            setMode("passcall");
            setPassEnabled(true);
            return;
        };
        return;
    }

    // Swap player's 8 Bam with Andy's exposed Joker
    const swap = async () => {
        setStep(119);
        setMode("");
        setSwapEnabled(false);
        soundCallStatus();
        setDownStatus("Swap");
        await delay(1500);

        // Isolate and unlock Across's Joker, isolate and lock Down's 8b
        const joker = acrossHand.filter(tile => tile.name === "Joker")[0];
        const jokerIndex = acrossHand.findIndex(tile => tile.id === joker.id);
        const newJoker = { ...joker, locked: false, groupname: "" };
        const newSwap = { ...toSwap, locked: true, groupname: "8 Bam" };

        // Perform swap
        setDownHand([...downHand, newJoker]);
        let hand = [...acrossHand];
        hand[jokerIndex] = newSwap;
        setAcrossHand([...hand]);
        setDownStatus("");
        setToSwap(null);
        soundTileClick();
        await delay(1500);

        setMode("discard");
        setStep(120);
        return;
    }

    //#endregion


    // Tile piles, buttons, statuses
    const centerDisplays = () => {
        return (<>
            {/* Tile piles */}
            <div className='tile-pile draw'>
                <h4 className='center-label'>Draw Pile</h4>
                <h5 className='center-label'>{drawPile.length} {drawPile.length === 1 ? "tile" : "tiles"} remain</h5>
            </div>

            <div className='tile-pile current'>
                <h4 className='center-label'>Current Discard</h4>
                {currDiscard !== null ?
                    <Tile id={currDiscard.id} tile={currDiscard} /> :
                    <h5 className="TileSpace">None</h5>}
            </div>

            <div className='tile-pile discard'>
                <h4 className='center-label'>Discard Pile</h4>
                <h5 className='center-label'>{discardPile.length} {discardPile.length === 1 ? "tile" : "tiles"} passed</h5>
            </div>

            {/* Player status messages (when not clear) */}
            {downStatus !== "" && <div className='player-status down-status'>{downStatus}</div>}
            {leftStatus !== "" && <div className='player-status left-status'>{leftStatus}</div>}
            {rightStatus !== "" && <div className='player-status right-status'>{rightStatus}</div>}
            {acrossStatus !== "" && <div className='player-status across-status'>{acrossStatus}</div>}

            {/* Pass and call buttons */}
            {mode === "passcall" && !isTurn && <button style={style.passButton}
                className='action-button pass' onClick={() => pass()}>PASS</button>}
            {mode === "passcall" && !isTurn && <button style={style.callButton}
                className='action-button call' onClick={() => call()}>CALL</button>}

            {/* Button options when calling. Some are decorative only */}
            {mode === "callopt" && <button style={style.pongButton}
                className='action-button pong'>PONG</button>}
            {mode === "callopt" && <button style={style.kongButton}
                className='action-button kong' onClick={() => kong()}>KONG</button>}
            {mode === "callopt" && <button style={style.quintButton}
                className='action-button quint'>QUINT</button>}
            {mode === "callopt" && <button style={style.mahjongButton}
                className='action-button callmahjong' onClick={() => mahjong()}>MAHJONG</button>}
            {mode === "callopt" && <button style={style.undoCallButton}
                className='action-button undocall' onClick={() => undoCall()}>&#x2716;</button>}

            {/* Nonfunctional discard and swap zones for display/highlights */}
            {mode === "discard" && !discardEnabled && <div style={style.discardBox}
                className='dropzone discard-box-display'><p>TILE DISCARD</p></div>}

            {mode === "discard" && !swapEnabled && <div style={style.swapBox}
                className='dropzone joker-box-display'><p>JOKER SWAP</p></div>}

            {/* Miscellaneous */}
            {step === 3 && <button onClick={() => rollDice()} className="dice">🎲</button>}

            {((step === 126) || ((step === 127 || step === 129 || step === 137) &&
                (currDiscard !== null && currDiscard.name !== "Joker" && currDiscard.name !== "7 Dot"))) && downStatus === "" &&
                <button onClick={() => hintButton()} className="help">&#x2754;</button>}
        </>)
    }

    const hintButton = () => {
        if (currDiscard === null) { return; }
        switch (step) {
            case (127): { setStep(128); return; };
            case (129): { setStep(130); return; };
            case (137): { setStep(138); return; };
            default: { return; }
        };
    }


    return (
        <div className="center-block">
            <div className='game-board'>
                <GameFunction
                    step={step} setStep={setStep} setMode={setMode} setIsTurn={setIsTurn}

                    drawPile={drawPile} setDrawPile={setDrawPile}
                    currDiscard={currDiscard} setCurrDiscard={setCurrDiscard}
                    discardPile={discardPile} setDiscardPile={setDiscardPile}
                    setToDiscard={setToDiscard}

                    downHand={downHand} setDownHand={setDownHand}
                    leftHand={leftHand} setLeftHand={setLeftHand}
                    rightHand={rightHand} setRightHand={setRightHand}
                    acrossHand={acrossHand} setAcrossHand={setAcrossHand}

                    setDownStatus={setDownStatus} setLeftStatus={setLeftStatus}
                    setRightStatus={setRightStatus} setAcrossStatus={setAcrossStatus}

                    setPassEnabled={setPassEnabled} setCallEnabled={setCallEnabled}
                    setDiscardEnabled={setDiscardEnabled} setSwapEnabled={setSwapEnabled}
                    setKongEnabled={setKongEnabled}
                    setWinning={setWinning} showScoreCard={showScoreCard}

                    highlight={highlight} updateHighlight={updateHighlight}
                    tileCounts={tileCounts} setTileCounts={setTileCounts}
                />

                {centerDisplays()}

                {/* Player */}<>
                    {/* Tabs */}
                    <button onClick={() => toggleScoreCard()} style={style.scoreCardTab}
                        className='game-tab score-card-tab'>Score Card</button>
                    <ScoreCard trigger={scoreCard} setTrigger={toggleScoreCard} hand={downHand}
                        winning={winning} step={step} setStep={setStep} />

                    <button onClick={() => sortTiles()} style={style.sortTilesTab} className='game-tab'>Sort Tiles</button>

                    <button onClick={() => toggleTileCounter()} style={style.tileCounterTab}
                        className='game-tab tile-counter-tab'>Tile Counter</button>
                    <TileCounter counts={tileCounts} trigger={tileCounter} setTrigger={toggleTileCounter} />

                    {/* Tile Rack */}
                    <div className='name-label down-label' style={style.playerName}>{username}</div>
                    <div className='tile-rack down-exposed' style={style.playerExposed} >
                        <DndContext collisionDetection={closestCorners} modifiers={[restrictToWindowEdges]}
                            onDragStart={(e) => handleDragStart(e, downHand)}
                            onDragOver={(e) => handleDragOver(e, setDownHand)}
                            onDragEnd={(e) => handleDragEnd(e, downHand, setDownHand)} >
                            <SortableContext items={downHand} strategy={horizontalListSortingStrategy}>
                                {downHand.filter(tile => tile.locked).map(tile => <Tile key={tile.id} tile={tile} />)}
                                <DragOverlay>
                                    {(activeId ? <Tile key={activeTile.id} tile={activeTile} /> : null)}
                                </DragOverlay>
                            </SortableContext>
                        </DndContext>
                    </div>
                    <div className='tile-rack down-divider' style={style.playerDivider} />
                    <div className='tile-rack down-hidden' style={style.playerHidden} >
                        <DndContext collisionDetection={closestCorners} modifiers={[restrictToWindowEdges]}
                            onDragStart={(e) => handleDragStart(e, downHand)}
                            onDragOver={(e) => handleDragOver(e, setDownHand)}
                            onDragEnd={(e) => handleDragEnd(e, downHand, setDownHand)} >
                            <SortableContext items={downHand} strategy={horizontalListSortingStrategy}>
                                {downHand.filter(tile => !tile.locked).map(tile => <Tile key={tile.id} tile={tile} />)}
                                <DragOverlay>
                                    {activeId ? <Tile key={activeTile.id} tile={activeTile} /> : null}
                                </DragOverlay>
                            </SortableContext>

                            {(mode === "discard" || mode === "dconfirm") && discardEnabled &&
                                <DropBox highlighted={highlight.discardBox} className='dropzone discard-box' id='discard'
                                    contents={toDiscard !== null ? <Tile tile={toDiscard} /> : <p>TILE DISCARD</p>} />}

                            {(mode === "dconfirm" || mode === "sconfirm") &&
                                <button style={style.confundoButtons} className='action-button undo'
                                    onClick={() => undo()}>&#x2716;</button>}

                            {(mode === "dconfirm" || mode === "sconfirm") &&
                                <button style={style.confundoButtons} className='action-button confirm'
                                    onClick={() => confirm()}>&#x2714;</button>}

                            {(mode === "discard" || mode === "sconfirm") && swapEnabled &&
                                <DropBox highlighted={highlight.swapBox} className='dropzone joker-box' id='joker'
                                    contents={toSwap !== null ? <Tile tile={toSwap} /> : <p>JOKER SWAP</p>} />}
                        </DndContext>
                    </div></>

                {/* Luke-Left */}<>
                    <div className='name-label left-label'>Luke</div>
                    <div className='tile-rack left-exposed'>
                        {leftHand.filter(tile => tile.locked).map(tile => <Tile key={tile.id} tile={tile} vertical={true} />)}
                    </div>
                    <div className='tile-rack left-divider' />
                    <div className='tile-rack left-hidden'>
                        {leftHand.filter(tile => !tile.locked).map(tile => <div key={tile.id} className='Tile hidden-vertical' />)}
                    </div></>

                {/* Rachel-Right */}<>
                    <div className='name-label right-label'>Rachel</div>
                    <div className='tile-rack right-exposed'>
                        {rightHand.filter(tile => tile.locked).map(tile => <Tile key={tile.id} tile={tile} vertical={true} />)}
                    </div>
                    <div className='tile-rack right-divider' />
                    <div className='tile-rack right-hidden'>
                        {rightHand.filter(tile => !tile.locked).map(tile => <div key={tile.id} className='Tile hidden-vertical' />)}
                    </div></>

                {/*Andy-Across */}<>
                    <div className='name-label across-label'>Andy</div>
                    <div className='tile-rack across-exposed' style={style.andyExposed}>
                        {acrossHand.filter(tile => tile.locked).map(tile => <Tile key={tile.id} tile={tile} vertical={false} />)}
                    </div>
                    <div className='tile-rack across-divider' />
                    <div className='tile-rack across-hidden'>
                        {acrossHand.filter(tile => !tile.locked).map(tile => <div key={tile.id} className='Tile hidden-horizontal' />)}
                    </div></>
            </div>

            {/* Return Button */}
            {isMobile ? (!scoreCard && !tileCounter &&
                <Link to="/instructions" className="back-home">
                    <span className="back-button tutorial-bb">&#8617;</span>
                </Link>
            ) : (
                <Link to="/instructions" className="back-home">
                    <span className="back-button tutorial-bb">&#8617;</span>
                </Link>
            )}
        </div>
    );
}