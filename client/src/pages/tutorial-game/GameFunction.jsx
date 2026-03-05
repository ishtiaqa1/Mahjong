import React from "react";

import Dialogue from "./Dialogue.jsx";
import Tile from "../gameplay/Tile.jsx";

import useSound from 'use-sound';
import sfxTileClick from '/src/assets/sounds/tile-click.mp3';
import sfxOpenCard from '/src/assets/sounds/open-card.mp3';
import sfxPassStatus from '/src/assets/sounds/pass-status.mp3';
import sfxCallStatus from '/src/assets/sounds/call-status.mp3';


export default function GameFunction({
    step, setStep, setMode, setIsTurn, drawPile, setDrawPile,
    currDiscard, setCurrDiscard, discardPile, setDiscardPile, setToDiscard,
    downHand, setDownHand, leftHand, setLeftHand,
    rightHand, setRightHand, acrossHand, setAcrossHand,
    setDownStatus, setLeftStatus, setRightStatus, setAcrossStatus,
    setPassEnabled, setCallEnabled, setDiscardEnabled,
    setSwapEnabled, setKongEnabled, setWinning, showScoreCard,
    highlight, updateHighlight, tileCounts, setTileCounts
}) {

    const dialogue = Dialogue();
    const [soundTileClick] = useSound(sfxTileClick);
    const [soundOpenCard] = useSound(sfxOpenCard);
    const [soundPassStatus] = useSound(sfxPassStatus);
    const [soundCallStatus] = useSound(sfxCallStatus);

    const soundTileStack = async () => {
        soundTileClick();
        await delay(50);
        soundTileClick();
    }

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    const deal = () => {
        setLeftHand([...drawPile.slice(0, 13), drawPile[52]]);
        setDownHand([...drawPile.slice(13, 26)]);
        setRightHand([...drawPile.slice(26, 39)]);
        setAcrossHand([...drawPile.slice(39, 52)]);
        setDrawPile(tiles => tiles.slice(53));
        soundTileStack();
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

    const moveCurrToDiscardPile = () => {
        setDiscardPile([...discardPile, currDiscard]);
        setTileCounts({ ...tileCounts, [currDiscard.name]: tileCounts[currDiscard.name] + 1 });
        setCurrDiscard(null);
        setDownStatus("");
        setLeftStatus("");
        setRightStatus("");
        setAcrossStatus("");
        soundTileClick();
    }

    const kong = () => {
        const clearedHand = downHand.filter(tile => tile.name !== "7 Crack" && tile.name !== "Joker");
        const tilesToLock = [currDiscard, ...downHand.filter(tile => tile.name === "7 Crack"),
            ...downHand.filter(tile => tile.name === "Joker")];
        const lockedTiles = tilesToLock.map(tile => { return { ...tile, locked: true, groupname: "7 Crack" }; })
        setDownHand([...lockedTiles, ...clearedHand]);
        setCurrDiscard(null);
        setDownStatus("");
        setLeftStatus("");
        setRightStatus("");
        setAcrossStatus("");
        setIsTurn(true);
        setMode("discard");
        setStep(step + 1);
        soundTileStack();
        return;
    }

    const buttonAction = async () => {
        switch (step) {
            case 5: {
                setDownStatus("");
                setLeftStatus("");
                setRightStatus("");
                setAcrossStatus("");
                setStep(step + 1);
                return;
            };
            case 6: {
                deal();
                setStep(step + 1);
                return;
            };
            case 8: {
                updateHighlight({
                    ...highlight,
                    playerHidden: true,
                    playerExposed: true,
                    playerDivider: true,
                    playerName: true,
                    scoreCardTab: true,
                    sortTilesTab: true,
                    tileCounterTab: true,
                })
                setStep(step + 1);
                return;
            };
            case 9: {
                updateHighlight({
                    ...highlight,
                    playerExposed: false,
                    playerDivider: false,
                    playerName: false,
                    scoreCardTab: false,
                    tileCounterTab: false,
                })
                setStep(step + 1);
                return;
            };
            case 10: {
                updateHighlight({
                    ...highlight,
                    playerExposed: true,
                    playerHidden: false,
                    sortTilesTab: false,
                })
                setStep(step + 1);
                return;
            };
            case 11: {
                updateHighlight({
                    ...highlight,
                    playerExposed: false,
                    playerHidden: true,
                })
                setStep(step + 1);
                return;
            };
            case 14: {
                updateHighlight({
                    ...highlight,
                    playerHidden: false,
                    scoreCardTab: true,
                })
                setStep(step + 1);
                return;
            };
            case 16: {
                updateHighlight({
                    ...highlight,
                    scoreCardTab: false,
                })
                setStep(step + 1);
                return;
            };
            case 25: {
                updateHighlight({
                    ...highlight,
                    scoreCardTab: false,
                });
                setStep(step + 2);
                return;
            };
            case 28: {
                setStep(29);
                await delay(1000);
                const deadTile = leftHand[0];
                setLeftHand(leftHand.filter(tile => tile.id !== deadTile.id));
                soundTileClick();
                await delay(1500);
                npcDiscard(deadTile);
                setMode("passcall");
                await delay(1500);
                setStep(30);
                return;
            };
            case 31: {
                updateHighlight({
                    ...highlight,
                    passButton: true
                });
                setStep(step + 1);
                return;
            };
            case 32: {
                updateHighlight({
                    ...highlight,
                    passButton: false,
                    callButton: true
                });
                setStep(step + 1);
                return;
            };
            case 33: {
                updateHighlight({
                    ...highlight,
                    passButton: true,
                    callButton: false
                });
                setStep(step + 1);
                setPassEnabled(true);
                return;
            };
            case 36: {
                moveCurrToDiscardPile();
                setStep(step + 1);
                return;
            };
            case 37: {
                updateHighlight({
                    ...highlight,
                    tileCounterTab: true,
                });
                setStep(step + 1);
                return;
            };
            case 38: {
                updateHighlight({
                    ...highlight,
                    tileCounterTab: false,
                });
                setStep(step + 1);
                return;
            };
            case 39: {
                updateHighlight({
                    ...highlight,
                    playerHidden: true,
                })
                draw(downHand, setDownHand);
                setMode("discard");
                setIsTurn(true);
                setStep(step + 1);
                return;
            };
            case 40: {
                updateHighlight({
                    ...highlight,
                    playerHidden: false,
                    scoreCardTab: true,
                });
                setStep(step + 1);
                return;
            };
            case 51: {
                updateHighlight({
                    ...highlight,
                    scoreCardTab: false,
                });
                setStep(step + 2);
                return;
            };
            case 53: {
                updateHighlight({
                    ...highlight,
                    discardBox: true,
                });
                setStep(step + 1);
                return;
            };
            case 54: {
                updateHighlight({
                    ...highlight,
                    discardBox: false,
                    swapBox: true,
                });
                setStep(step + 1);
                return;
            };
            case 55: {
                updateHighlight({
                    ...highlight,
                    playerHidden: true,
                    swapBox: false,
                });
                setStep(step + 1);
                return;
            };
            case 57: {
                updateHighlight({
                    ...highlight,
                    discardBox: true,
                    confirmButtons: true,
                })
                setDiscardEnabled(true);
                setStep(step + 1);
                return;
            };
            case 60: {
                setIsTurn(false);
                setStep(step + 1);
                await delay(1500);
                soundPassStatus();
                setRightStatus("Pass");
                await delay(1500);
                soundPassStatus();
                setAcrossStatus("Pass");
                await delay(1500);
                soundPassStatus();
                setLeftStatus("Pass");
                await delay(1500);
                setStep(step + 2);
                return;
            };
            case 62: {
                moveCurrToDiscardPile();
                setStep(step + 1);
                return;
            };
            case 64: {
                draw(rightHand, setRightHand);
                setStep(step + 1);
                return;
            };
            case 65: {
                setStep(66);
                await delay(1000);
                soundTileClick();
                const deadTile = rightHand[0];
                setRightHand(rightHand.filter(tile => tile.id !== deadTile.id));
                soundTileClick();
                await delay(1500);
                npcDiscard(deadTile);
                setMode("passcall");
                await delay(1500);
                setStep(67);
                return;
            };
            case 67: {
                updateHighlight({
                    ...highlight,
                    passButton: true,
                });
                setPassEnabled(true);
                setStep(step + 1);
                return;
            };
            case 70: {
                setStep(71);
                await delay(1500);
                moveCurrToDiscardPile();
                await delay(1500);
                setStep(72);
                return;
            };
            case 72: {
                setStep(73);
                await delay(1000);
                const drawnTile = draw(acrossHand, setAcrossHand);
                await delay(1500);
                const deadTile = acrossHand[0];
                setAcrossHand([...acrossHand.filter(tile => tile.id !== deadTile.id), drawnTile]);
                soundTileClick();
                await delay(1500);
                npcDiscard(deadTile);
                setMode("passcall");
                await delay(1500);
                setStep(74);
                return;
            };
            case 80: {
                updateHighlight({
                    ...highlight,
                    callButton: true,
                })
                setCallEnabled(true);
                setStep(step + 1);
                return;
            };
            case 82: {
                updateHighlight({
                    ...highlight,
                    pongButton: false,
                    kongButton: false,
                    quintButton: false,
                    undoCallButton: false,
                });
                setStep(step + 1);
                return;
            };
            case 83: {
                setKongEnabled(true);
                updateHighlight({
                    ...highlight,
                    kongButton: true,
                    undoCallButton: true,
                    mahjongButton: false,
                });
                setStep(step + 1);
                return;
            };
            case 85: {
                setStep(86);
                await delay(1500);
                soundPassStatus();
                setLeftStatus("Pass");
                await delay(1500);
                soundPassStatus();
                setRightStatus("Pass");
                await delay(1500);
                setStep(87);
                return;
            };
            case 87: {
                setStep(88);
                await delay(1000);
                kong();
                setIsTurn(true);
                await delay(1500);
                updateHighlight({
                    ...highlight,
                    playerExposed: true,
                });
                setStep(89);
                return;
            };
            case 91: {
                updateHighlight({
                    ...highlight,
                    playerExposed: false,
                    playerHidden: true,
                });
                setStep(step + 1);
                return;
            };
            case 93: {
                updateHighlight({
                    ...highlight,
                    discardBox: true,
                    confundoButtons: true,
                });
                setDiscardEnabled(true);
                setStep(step + 1);
                return;
            };
            case 98: {
                setStep(99);
                await delay(1000);
                // Isolate and unlock our Joker, isolate and lock Right's 7c
                const joker = downHand.filter(tile => tile.name === "Joker")[0];
                const jokerIndex = downHand.findIndex(tile => tile.id === joker.id);
                const newJoker = { ...joker, locked: false, groupname: "" };
                const sevCrack = rightHand.filter(tile => tile.name === "7 Crack")[0];
                const newSC = { ...sevCrack, locked: true, groupname: "7 Crack" };

                // Perform swap
                setRightHand([...rightHand.filter(tile => tile.name !== "7 Crack"), newJoker]);
                let hand = [...downHand];
                hand[jokerIndex] = newSC;
                setDownHand([...hand]);
                setRightStatus("");
                soundTileClick();
                await delay(1500);
                setStep(100);
                return;
            };
            case 100: {
                setStep(101);
                await delay(1000);
                const deadTile = rightHand[0];
                setRightHand(rightHand.filter(tile => tile.id !== deadTile.id));
                soundTileClick();
                await delay(1500);
                npcDiscard(deadTile);
                setMode("passcall");
                setCallEnabled(false);
                setPassEnabled(true);
                await delay(1500);
                setStep(102);
                return;
            };
            case 104: {
                // Left and Across both call "8 Bam", Across takes pong and discards
                setStep(105);
                await delay(1000);

                const clearedHand = acrossHand.filter(tile => tile.name !== "8 Bam" && tile.name !== "Joker");
                const tilesToLock = [currDiscard, ...acrossHand.filter(tile => tile.name === "8 Bam"),
                    ...acrossHand.filter(tile => tile.name === "Joker")];
                const lockedTiles = tilesToLock.map(tile => { return { ...tile, locked: true, groupname: "8 Bam" }; })
                setAcrossHand([...clearedHand, ...lockedTiles]);

                setCurrDiscard(null);
                setCurrDiscard(null);
                setPassEnabled(false);
                setDownStatus("");
                setLeftStatus("");
                setRightStatus("");
                setAcrossStatus("");
                setMode("");
                soundTileStack();
                await delay(1500);

                const deadTile = acrossHand[1];
                setAcrossHand([...clearedHand, ...lockedTiles].filter(tile => tile.id !== deadTile.id));
                soundTileClick();
                await delay(1500);

                npcDiscard(deadTile);
                setMode("passcall");
                await delay(1500);

                setStep(106);
                return;
            };
            case 107: {
                setPassEnabled(true);
                setStep(step + 1);
                return;
            };
            case 113: {
                updateHighlight({
                    ...highlight,
                    playerHidden: false,
                    andyExposed: true,
                });
                setStep(step + 1);
                return;
            };
            case 115: {
                updateHighlight({
                    ...highlight,
                    playerHidden: true,
                    andyExposed: false,
                });
                setStep(step + 1);
                return;
            };
            case 116: {
                updateHighlight({
                    ...highlight,
                    swapBox: true,
                });
                setSwapEnabled(true);
                setStep(step + 1);
                return;
            };
            case 121: {
                setDiscardEnabled(true);
                setStep(step + 1);
                return;
            };
            case 126: {
                setStep(step + 1);
                setIsTurn(false);
                await delay(1000);

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
            case 128: {
                setStep(step - 1);
                return;
            };
            case 130: {
                setStep(step - 1);
                return;
            };
            case 131: {
                setStep(step + 1);
                await delay(1000);
                moveCurrToDiscardPile();
                await delay(1500);
                draw(downHand, setDownHand);
                setMode("discard");
                setIsTurn(true);
                await delay(1500);
                setStep(133);
                return;
            };
            case 133: {
                updateHighlight({
                    ...highlight,
                    playerHidden: true,
                });
                setStep(step + 1);
                return;
            };
            case 134: {
                setMode("discard");
                setDiscardEnabled(true);
                setIsTurn(true);
                updateHighlight({
                    ...highlight,
                    playerHidden: false,
                });
                setStep(step + 1);
                return;
            };
            case 138: {
                setStep(step - 1);
                return;
            };
            case 142: {
                setStep(step + 1);
                await delay(1000);
                soundPassStatus();
                setRightStatus("Pass");
                await delay(1500);
                soundCallStatus();
                setLeftStatus("Call - Pong");
                await delay(1500);
                setStep(144);
                return;
            };
            case 145: {
                setWinning(true);
                setDownHand([...downHand, currDiscard]);
                soundOpenCard();
                showScoreCard(true);
                setStep(step + 1);
                return;
            };

            default: {
                setStep(step + 1);
                return;
            };
        }
    }

    const displayJoker = { "name": "Joker", "id": 711, "type": "joker", "locked": false };
    const displayEast = { "name": "East", "id": 421, "type": "wind", "suit": "east", "locked": false };
    const display1Dot = { "name": "1 Dot", "id": 111, "type": "number", "suit": "dot", "num": 1, "locked": false };
    const displayFlower = { "name": "Flower", "id": 611, "type": "flower", "locked": false };
    const display7Dot = { "name": "7 Dot", "id": 171, "type": "number", "suit": "dot", "num": 7, "locked": false };

    if (dialogue[step] === undefined) {
        return "";
    } else {
        const data = dialogue[step];
        if (data.background !== "") {
            return (
                <div className={data.background}>
                    {data.highlight !== "" && <div className={data.highlight} />}
                    {step === 10 && <div className='highlight hl-sort' />}
                    {(step === 58 || step === 59 || step === 94 || step === 95) &&
                        <div className='highlight hl-discard' />}
                    {(step === 117 || step === 118) &&
                        <div className='highlight hl-swap' />}
                    {(step === 59 || step === 95 || step === 118) && <div className='highlight hl-confundo' />}
                    {step === 84 && <div className='highlight hl-undocall' />}

                    <div className={data.popup}>
                        {step === 14 && <Tile id={displayJoker.id} tile={displayJoker} />}
                        {(step === 57 || step === 58) && <Tile id={displayEast.id} tile={displayEast} />}
                        {93 <= step && step <= 95 && <Tile id={display1Dot.id} tile={display1Dot} />}

                        <div dangerouslySetInnerHTML={{ __html: data.text }} />

                        {step === 18 && <ul>
                            <li><b>1-9</b> for all numbered tiles,</li>
                            <li><b>D</b> for any Dragons,</li>
                            <li><b>F</b> for Flowers,</li>
                            <li><b>N, E, W, S</b> for North, East, West, and South,</li>
                            <li><b>R</b> for Red Dragons,</li><li><b>G</b> for Green Dragons,</li>
                            <li>and <b>0</b> for White Dragons, or Soaps.</li>
                        </ul>}

                        {step === 19 && <ul>
                            <li>A <b>single</b> is 1 tile,</li>
                            <li>A <b>pair</b> is 2 tiles,</li>
                            <li>A <b>pong</b> is 3 tiles,</li>
                            <li>A <b>kong</b> is 4 tiles,</li>
                            <li>and a <b>quint</b> is 5 tiles.</li>
                        </ul>}

                        {data.button && <button onClick={() => buttonAction()} className='tpbutton'>
                            {step === 0 ? "CLICK TO START" : (
                                (step === 128 || step === 130 || step === 138) ? "CLOSE" : "NEXT")}
                        </button>}

                        {step === 16 && <><br /><button onClick={() => {
                            updateHighlight({
                                ...highlight,
                                scoreCardTab: false,
                            });
                            setStep(27);
                        }} className='tpbutton small'>SKIP SCORE CARD</button></>}

                        {step === 42 && <><br /><button onClick={() => {
                            updateHighlight({
                                ...highlight,
                                scoreCardTab: false,
                            });
                            setStep(53);
                        }} className='tpbutton small'>SKIP SCORE CARD</button></>}
                    </div>
                </div>
            )
        } else {
            return (
                <div className={data.popup}>
                    {(step === 122 || step === 123) && <Tile id={displayFlower.id} tile={displayFlower} />}
                    {(step === 135 || step === 136) && <Tile id={display7Dot.id} tile={display7Dot} />}
                    <div dangerouslySetInnerHTML={{ __html: data.text }} />
                    {data.button && <button onClick={() => buttonAction()} className='tpbutton'>NEXT</button>}
                </div>
            )
        }
    }
}