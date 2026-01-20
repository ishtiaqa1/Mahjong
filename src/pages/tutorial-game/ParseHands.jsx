import React, { useState } from 'react';
import Tile from '../gameplay/Tile.jsx';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { useNavigate } from 'react-router-dom';

import useSound from 'use-sound';
import sfxTileClick from '/src/assets/sounds/tile-click.mp3';
import sfxGameWin from '/src/assets/sounds/game-win.mp3';

const ConfirmMahjong = (props) => {
    const [activeId, setActiveId] = useState(null);
    const [activeTile, setActiveTile] = useState(null);
    const [soundTileClick] = useSound(sfxTileClick);
    const [soundGameWin] = useSound(sfxGameWin);

    const navigate = useNavigate();

    // Track dragged tiles
    const handleDragStart = (event) => {
        setActiveId(event.active.id);
        setActiveTile(props.displayHand[props.displayHand.findIndex(tile => tile.id === event.active.id)]);
    };

    // Move tiles accordingly when dragged around
    const handleDragOver = (event) => {
        const { active, over } = event;
        if (active === null || over === null || !active.id || active.id === over.id) {
            return;
        }
        soundTileClick();
    }

    // Move dragged tiles on drop
    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);
        setActiveTile(null);

        // If not moving, do nothing
        if (active.id === over.id) { return; }

        // Else moving within hand, rearrange as needed
        soundTileClick();
        props.setDisplayHand(hand => {
            const oldPos = hand.findIndex(tile => tile.id === active.id);
            const newPos = hand.findIndex(tile => tile.id === over.id);
            return arrayMove(hand, oldPos, newPos);
        })
    }

    return props.trigger ? (
        <div className='game-popup'>
            <div className='game-popup-contents'>
                <h2 style={{ marginTop: 0, marginBottom: 20 }} >Your Selected Hand</h2>
                <div className='confirm-background'>
                    <div className='scorecard-category'>{props.translateHand(props.winSet)}</div>
                </div>
                <br />
                <div className='confirm-background'>
                    <DndContext collisionDetection={closestCorners} modifiers={[restrictToWindowEdges]}
                        onDragStart={(e) => handleDragStart(e)}
                        onDragOver={(e) => handleDragOver(e)}
                        onDragEnd={(e) => handleDragEnd(e)}>
                        <SortableContext items={props.displayHand} strategy={horizontalListSortingStrategy}>
                            {props.displayHand.map(tile => <Tile key={tile.id} tile={tile} />)}
                            <DragOverlay>
                                {activeId ? <Tile key={activeTile.id} tile={activeTile} /> : null}
                            </DragOverlay>
                        </SortableContext>
                    </DndContext>
                </div>

                <br />
                <button className='game-popup-cancel-button'>CANCEL</button>
                &ensp;&ensp;&ensp;&ensp;
                <button className='game-popup-button' onClick={() => {
                    if (props.step !== 157) {
                        return;
                    } else {
                        soundGameWin();
                        return navigate("/tutorial-game/win");
                    }
                }}>CONFIRM</button>
            </div>
        </div>
    ) : ""
}


export default function ParseHands(props) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [winSet, setWinSet] = useState([]);
    const [displayHand, setDisplayHand] = useState(props.playerHand);

    const getClassName = (color) => {
        switch (color) {
            case "red": return "mahjong-red";
            case "green": return "mahjong-green";
            default: return "mahjong-black";
        }
    }

    const translateHand = (hand) => {
        // Turn on mark for special hand conditions
        if (hand["hover"] !== "") {
            return (
                <button className='hand-condition-button' onClick={(e) => props.setCondition(hand.hover)}>
                    <mark className='winning-hand'>{hand["contents"].map((tilegroup) =>
                    (<p key={tilegroup.id} title={hand.hover}
                        className={getClassName(tilegroup.color)}> {tilegroup.display.repeat(tilegroup.count)} </p>))}
                    </mark>
                </button>
            )
        } else {
            return (
                <div>{hand["contents"].map((tilegroup) =>
                (<p key={tilegroup.id} title={hand.hover}
                    className={getClassName(tilegroup.color)}> {tilegroup.display.repeat(tilegroup.count)} </p>))}
                </div>
            )
        }
    }

    const translateDisplay = () => {
        if (props.calling) {
            return props.winSet.map((hand) =>
                (<button className='winning-hand-button' onClick={() => confirm(hand)} key={hand.id}>{translateHand(hand)}</button>))
        } else {
            return props.winSet.map((hand) =>
                (<div key={hand.id}>{translateHand(hand)}</div>))
        }
    }

    const confirm = (winningHand) => {
        if (!props.winning || winningHand.id !== 202) { return; }
        setWinSet(winningHand);
        // Unlock and order for display
        setDisplayHand([
            { "name": "Flower", "id": 611, "type": "flower", "locked": false },
            { "name": "Flower", "id": 612, "type": "flower", "locked": false },
            { "name": "7 Crack", "id": 371, "type": "number", "suit": "crack", "num": 7, "locked": false },
            { "name": "7 Crack", "id": 372, "type": "number", "suit": "crack", "num": 7, "locked": false },
            { "name": "7 Crack", "id": 373, "type": "number", "suit": "crack", "num": 7, "locked": false },
            { "name": "7 Crack", "id": 374, "type": "number", "suit": "crack", "num": 7, "locked": false },
            { "name": "Red Dragon", "id": 521, "type": "dragon", "suit": "red", "locked": false },
            { "name": "Red Dragon", "id": 522, "type": "dragon", "suit": "red", "locked": false },
            { "name": "7 Bam", "id": 271, "type": "number", "suit": "bam", "num": 7, "locked": false },
            { "name": "7 Bam", "id": 272, "type": "number", "suit": "bam", "num": 7, "locked": false },
            { "name": "7 Bam", "id": 273, "type": "number", "suit": "bam", "num": 7, "locked": false },
            { "name": "Joker", "id": 711, "type": "joker", "locked": false },
            { "name": "White Dragon", "id": 531, "type": "dragon", "suit": "white", "locked": false },
            { "name": "White Dragon", "id": 532, "type": "dragon", "suit": "white", "locked": false },
        ]);
        setShowConfirm(true);
        props.setStep(props.step + 1);
        return;
    }

    return (
        <div>
            {translateDisplay()}
            <ConfirmMahjong trigger={showConfirm} setTrigger={setShowConfirm} winSet={winSet} step={props.step}
                playerHand={props.playerHand} displayHand={displayHand} setDisplayHand={setDisplayHand} translateHand={translateHand} />
        </div>
    );
}