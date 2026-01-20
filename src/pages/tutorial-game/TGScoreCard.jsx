import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';

import ReadingGuide from '../gameplay/ReadingGuide.jsx';
import ParseHands from './ParseHands.jsx';

import AnyLikeNumbers from '../gameplay/winning-hands/AnyLikeNumbers.jsx';
import Quints from '../gameplay/winning-hands/Quints.jsx';
import WindsDragons from '../gameplay/winning-hands/WindsDragons.jsx';

import useSound from 'use-sound';
import sfxOpenCard from '/src/assets/sounds/open-card.mp3';
import sfxCloseCard from '/src/assets/sounds/close-card.mp3';

import '/src/index.css';
import '../page-styles/GamePopup.css';
import '../page-styles/TutorialGame.css';


export default function ScoreCard(props) {
    const [showGuide, setShowGuide] = useState(false);
    const [callingMahjong, setCallingMahjong] = useState(false);
    const [condition, setCondition] = useState("");

    const minPage = 1;
    const maxPage = 3;
    const [page, turnPage] = useState(1);

    const [soundOpenCard] = useSound(sfxOpenCard);
    const [soundCloseCard] = useSound(sfxCloseCard);

    const toggleReadingGuide = (tf) => {
        if (!showGuide) {
            setShowGuide(true);
            soundOpenCard();
        } else {
            setShowGuide(false);
            soundCloseCard();
        }
    }

    const closeAll = () => {
        setCallingMahjong(false);
        turnPage(1);
        setCondition("");
        props.setTrigger();
    }

    const callMahjong = () => {
        if (props.winning) {
            props.setStep(props.step + 1);
        };
        setCallingMahjong(true);
    }

    const cardHeader = () => {
        if (callingMahjong) {
            // Header for calling mahjong
            return (<>
                {!props.winning && <button className='game-popup-close-button' onClick={() => closeAll()} >&#x2716;</button>}
                <h3 className='game-popup-subtitle'>Select the winning combination that matches your hand.</h3>
            </>)
        } else {
            // Header for generic score card
            return (<>
                {!props.winning && <button className='game-popup-close-button' onClick={() => closeAll()} >&#x2716;</button>}
                {(props.hand.length === 14) && <button style={{ width: isMobile && 400, padding: isMobile && 4 }} className='game-popup-button' onClick={() => callMahjong()}>CALL MAHJONG</button>}
            </>)
        }
    }

    const pageButton = () => {
        return (<>
            {page !== minPage && <button className='game-popup-button' onClick={() => {
                turnPage(Math.max(minPage, page - 1));
                setCondition("");
            }}>&#9664;</button>}
            &ensp;
            {page !== maxPage && <button className='game-popup-button' onClick={() => {
                turnPage(Math.min(maxPage, page + 1));
                setCondition("");
            }}>&#9654;</button>}
        </>)
    }

    return (props.trigger) ? (
        <div className='tpb card-bg'>
            <div className='tutorial-game-popup'>
                <h1 style={{ marginBottom: 2 }}>Score Card</h1>
                {!props.winning && <button className='help-button' onClick={() => { toggleReadingGuide() }}>&#x2754;</button>}
                <ReadingGuide trigger={showGuide} setTrigger={toggleReadingGuide} />
                {cardHeader()}
                {condition !== "" && !callingMahjong && <p className='hand-condition'>{condition}</p>}

                {isMobile ? (
                    <div className='tile-container'>
                        {page === 1 && <div>
                            <p className='scorecard-category'>ANY LIKE NUMBERS</p>
                            <div className='scorecard-column'>
                                <ParseHands winSet={AnyLikeNumbers()} playerHand={props.hand} calling={callingMahjong} winning={props.winning}
                                    setBackTrigger={setCallingMahjong} step={props.step} setCondition={setCondition} setStep={props.setStep} />
                            </div>
                            <br />
                            {pageButton()}
                        </div>}
                        {page === 2 && <div>
                            <p className='scorecard-category'>QUINTS</p>
                            <div className='scorecard-column'>
                                <ParseHands winSet={Quints()} playerHand={props.hand} calling={callingMahjong} winning={props.winning}
                                    setBackTrigger={setCallingMahjong} step={props.step} setCondition={setCondition} setStep={props.setStep} />
                            </div>
                            <br />
                            {pageButton()}
                        </div>}
                        {page === 3 && <div>
                            <p className='scorecard-category'>WINDS-DRAGONS</p>
                            <div className='scorecard-column'>
                                <ParseHands winSet={WindsDragons()} playerHand={props.hand} calling={callingMahjong} winning={props.winning}
                                    setBackTrigger={setCallingMahjong} step={props.step} setCondition={setCondition} setStep={props.setStep} />
                            </div>
                            <br />
                            {pageButton()}
                        </div>}
                    </div>
                ) : (
                    <div className='tile-container'>
                        <div>
                            <p className='scorecard-category'>ANY LIKE NUMBERS</p>
                            <div className='scorecard-column'>
                                <ParseHands winSet={AnyLikeNumbers()} playerHand={props.hand} calling={callingMahjong} winning={props.winning}
                                    setBackTrigger={setCallingMahjong} step={props.step} setCondition={setCondition} setStep={props.setStep} />
                            </div>
                        </div>
                        <div>
                            <p className='scorecard-category'>QUINTS</p>
                            <div className='scorecard-column'>
                                <ParseHands winSet={Quints()} playerHand={props.hand} calling={callingMahjong} winning={props.winning}
                                    setBackTrigger={setCallingMahjong} step={props.step} setCondition={setCondition} setStep={props.setStep} />
                            </div>
                        </div>
                        <div>
                            <p className='scorecard-category'>WINDS-DRAGONS</p>
                            <div className='scorecard-column'>
                                <ParseHands winSet={WindsDragons()} playerHand={props.hand} calling={callingMahjong} winning={props.winning}
                                    setBackTrigger={setCallingMahjong} step={props.step} setCondition={setCondition} setStep={props.setStep} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    ) : "";
}