import React, { useRef, useEffect } from 'react';

import "/src/index.css";


export default function ProfilePopup(props) {
    // Credit for OutsideAlerter code:
    // https://stackoverflow.com/a/42234988

    function useOutsideAlerter(ref) {
        useEffect(() => {
            // Alert if clicked on outside of element
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    props.setTrigger(false);
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    // Alert if clicked on outside
    function OutsideAlerter(props) {
        const wrapperRef = useRef(null);
        useOutsideAlerter(wrapperRef);
        return <div ref={wrapperRef}>{props.children}</div>;
    }

    return (props.trigger) ? (
        <OutsideAlerter>
            <div style={props.style} className='profile-popup-contents'>
                <div className='profile-two-col'>
                    <div className='profile-picture-small' />             
                    <div>
                        <h3 className='profile-username'>{props.name}</h3>
                        {props.rank > 0 ? <b>Ranked #{props.rank}</b> : <i>Unranked</i>}
                    </div>
                </div>
                <br />
                <b>Total Wins:</b> {props.wins}
                <br />
                <b>Games Played:</b> {props.games}
            </div>
        </OutsideAlerter>
    ) : "";
}