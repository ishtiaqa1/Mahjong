import React, { useState } from 'react';
import ConfirmMahjong from "./ConfirmMahjong";


export default function ParseHands(props) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [winSet, setWinSet] = useState([]);
    const displayHand = props.playerHand;

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
        setWinSet(winningHand);
        setShowConfirm(true);
    }

    return (
        <div>
            {translateDisplay()}
            <ConfirmMahjong winSet={winSet} playerHand={props.playerHand} displayHand={displayHand} playerNum={props.playerNum}
                translateHand={translateHand} trigger={showConfirm} setTrigger={setShowConfirm} setBackTrigger={props.setBackTrigger} />
        </div>);
}