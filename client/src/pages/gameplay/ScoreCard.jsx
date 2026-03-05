import React, { useState } from 'react';

import ReadingGuide from './ReadingGuide.jsx';
import ParseHands from './ParseHands.jsx';

import AnyLikeNumbers from './winning-hands/AnyLikeNumbers.jsx';
import Quints from './winning-hands/Quints.jsx';
import WindsDragons from './winning-hands/WindsDragons.jsx';

import '/src/index.css';
import '../page-styles/GamePopup.css';


export default function ScoreCard(props) {
    const [showGuide, setShowGuide] = useState(false);
    const [callingMahjong, setCallingMahjong] = useState(false);
    const [condition, setCondition] = useState("");

    const closeAll = () => {
        setCallingMahjong(false);
        setCondition("");
        props.setTrigger({ ...props.trigger, [props.playerNum]: false });
    }

    const cardHeader = () => {
        if (callingMahjong) {
            // Header for calling mahjong
            return (<>
                <button className='game-popup-close-button' onClick={() => closeAll()} >&#x2716;</button>
                <h3 className='game-popup-subtitle'>Select the winning combination that matches your hand.</h3>
            </>)
        } else {
            // Header for generic score card
            return (<>
                <button className='game-popup-close-button' onClick={() => closeAll()} >&#x2716;</button>
                {(props.hand.length === 14) && <button className='game-popup-button' onClick={() => setCallingMahjong(true)}>CALL MAHJONG</button>}
            </>)
        }
    }

    return (props.trigger) ? (
        <div className='game-popup'>
            <div className='game-popup-contents'>
                <h1 style={{ marginBottom: 2 }}>Score Card</h1>
                <button className='help-button' onClick={() => setShowGuide(true)}>&#x2754;</button>
                <ReadingGuide trigger={showGuide} setTrigger={setShowGuide} />
                {cardHeader()}
                {condition !== "" && !callingMahjong && <p className='hand-condition'>{condition}</p>}

                <div className='tile-container'>
                    <div>
                        <p className='scorecard-category'>ANY LIKE NUMBERS</p>
                        <div className='scorecard-column'>
                            <ParseHands winSet={AnyLikeNumbers()} playerHand={props.hand} calling={callingMahjong}
                                playerNum={props.playerNum} setBackTrigger={setCallingMahjong} setCondition={setCondition} />
                        </div>
                    </div>
                    <div>
                        <p className='scorecard-category'>QUINTS</p>
                        <div className='scorecard-column'>
                            <ParseHands winSet={Quints()} playerHand={props.hand} calling={callingMahjong}
                                playerNum={props.playerNum} setBackTrigger={setCallingMahjong} setCondition={setCondition} />
                        </div>
                    </div>
                    <div>
                        <p className='scorecard-category'>WINDS-DRAGONS</p>
                        <div className='scorecard-column'>
                            <ParseHands winSet={WindsDragons()} playerHand={props.hand} calling={callingMahjong}
                                playerNum={props.playerNum} setBackTrigger={setCallingMahjong} setCondition={setCondition} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : "";
}