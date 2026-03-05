import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import "/src/index.css";
import "../page-styles/GamePopup.css";


export default function TileCounter(props) {
    const [page, turnPage] = useState(1);
    const minPage = 1;
    const maxPage = 2;

    const pageButton = () => {
        return (<>
            {page !== minPage && <button className='game-popup-button' onClick={() => turnPage(Math.max(minPage, page - 1))}>&#9664;</button>}
            &ensp;
            {page !== maxPage && <button className='game-popup-button' onClick={() => turnPage(Math.min(maxPage, page + 1))}>&#9654;</button>}
        </>)
    }

    return (props.trigger) ? (
        <div className="game-popup">
            <div className="game-popup-contents">
                <button className="game-popup-close-button" onClick={() => {
                    props.setTrigger(false);
                    turnPage(1);
                }}>&#x2716;</button>
                <h1>Discard Pile</h1>

                <div className="tile-container">
                    {isMobile ? (
                        <>
                            <div style={{width: 0, padding: 0}}/>
                            {page === 1 && <div style={{ padding: 0 }}>
                                <p className="tile-counter-category">DOTS</p>
                                <div className="tile-one-col">
                                    <div>1 Dot: {props.counts["1 Dot"]}&ensp;&ensp;2 Dot: {props.counts["2 Dot"]}&ensp;&ensp;3 Dot: {props.counts["3 Dot"]}</div>
                                    <div>4 Dot: {props.counts["4 Dot"]}&ensp;&ensp;5 Dot: {props.counts["5 Dot"]}&ensp;&ensp;6 Dot: {props.counts["6 Dot"]}</div>
                                    <div>7 Dot: {props.counts["7 Dot"]}&ensp;&ensp;8 Dot: {props.counts["8 Dot"]}&ensp;&ensp;9 Dot: {props.counts["9 Dot"]}</div>
                                </div>
                                <br />
                                <p className="tile-counter-category">BAMS</p>
                                <div className="tile-one-col">
                                    <div>1 Bam: {props.counts["1 Bam"]}&ensp;2 Bam: {props.counts["2 Bam"]}&ensp;3 Bam: {props.counts["3 Bam"]}</div>
                                    <div>4 Bam: {props.counts["4 Bam"]}&ensp;5 Bam: {props.counts["5 Bam"]}&ensp;6 Bam: {props.counts["6 Bam"]}</div>
                                    <div>7 Bam: {props.counts["7 Bam"]}&ensp;8 Bam: {props.counts["8 Bam"]}&ensp;9 Bam: {props.counts["9 Bam"]}</div>
                                </div>
                                <br />
                                <p className="tile-counter-category">CRACKS</p>
                                <div className="tile-one-col">
                                    <div>1 Crack: {props.counts["1 Crack"]}&ensp;&ensp;2 Crack: {props.counts["2 Crack"]}</div>
                                    <div>3 Crack: {props.counts["3 Crack"]}&ensp;&ensp;4 Crack: {props.counts["4 Crack"]}</div>
                                    <div>5 Crack: {props.counts["5 Crack"]}&ensp;&ensp;6 Crack: {props.counts["6 Crack"]}</div>
                                    <div>7 Crack: {props.counts["7 Crack"]}&ensp;&ensp;8 Crack: {props.counts["8 Crack"]}</div>
                                    <div>9 Crack: {props.counts["9 Crack"]}</div>
                                </div>
                                <br />
                                {pageButton()}
                            </div>}
                            {page == 2 && <div style={{ padding: 0 }}>
                                <p className="tile-counter-category">WINDS</p>
                                <div className="tile-one-col">
                                    <div>North: {props.counts["North"]}&ensp;&ensp;East: {props.counts["East"]}</div>
                                    <div>South: {props.counts["South"]}&ensp;&ensp;West: {props.counts["West"]}</div>
                                </div>
                                <br />
                                <p className="tile-counter-category">DRAGONS</p>
                                <div className="tile-one-col">
                                    <div>Green Dragon:&ensp;{props.counts["Green Dragon"]}</div>
                                    <div>Red Dragon:&ensp;{props.counts["Red Dragon"]}</div>
                                    <div>White Dragon:&ensp;{props.counts["White Dragon"]}</div>
                                </div>
                                <br />
                                <p className="tile-counter-category">SPECIAL</p>
                                <div className="tile-one-col">
                                    <div>Flowers:&ensp;{props.counts["Flower"]}</div>
                                    <div>Jokers:&ensp;{props.counts["Joker"]}</div>
                                </div>
                                <br />
                                {pageButton()}
                            </div>}
                            <div style={{width: 0, padding: 0}}/>
                        </>
                    ) :
                        (<>
                            <div>
                                <p className="tile-counter-category">DOTS</p>
                                <div className="tile-three-col">
                                    <div>1 Dot:&ensp;{props.counts["1 Dot"]}</div>
                                    <div>4 Dot:&ensp;{props.counts["4 Dot"]}</div>
                                    <div>7 Dot:&ensp;{props.counts["7 Dot"]}</div>
                                    <div>2 Dot:&ensp;{props.counts["2 Dot"]}</div>
                                    <div>5 Dot:&ensp;{props.counts["5 Dot"]}</div>
                                    <div>8 Dot:&ensp;{props.counts["8 Dot"]}</div>
                                    <div>3 Dot:&ensp;{props.counts["3 Dot"]}</div>
                                    <div>6 Dot:&ensp;{props.counts["6 Dot"]}</div>
                                    <div>9 Dot:&ensp;{props.counts["9 Dot"]}</div>
                                </div>
                            </div>
                            <div>
                                <p className="tile-counter-category">BAMS</p>
                                <div className="tile-three-col">
                                    <div>1 Bam:&ensp;{props.counts["1 Bam"]}</div>
                                    <div>4 Bam:&ensp;{props.counts["4 Bam"]}</div>
                                    <div>7 Bam:&ensp;{props.counts["7 Bam"]}</div>
                                    <div>2 Bam:&ensp;{props.counts["2 Bam"]}</div>
                                    <div>5 Bam:&ensp;{props.counts["5 Bam"]}</div>
                                    <div>8 Bam:&ensp;{props.counts["8 Bam"]}</div>
                                    <div>3 Bam:&ensp;{props.counts["3 Bam"]}</div>
                                    <div>6 Bam:&ensp;{props.counts["6 Bam"]}</div>
                                    <div>9 Bam:&ensp;{props.counts["9 Bam"]}</div>
                                </div>
                            </div>
                            <div>
                                <p className="tile-counter-category">CRACKS</p>
                                <div className="tile-three-col">
                                    <div>1 Crack:&ensp;{props.counts["1 Crack"]}</div>
                                    <div>4 Crack:&ensp;{props.counts["4 Crack"]}</div>
                                    <div>7 Crack:&ensp;{props.counts["7 Crack"]}</div>
                                    <div>2 Crack:&ensp;{props.counts["2 Crack"]}</div>
                                    <div>5 Crack:&ensp;{props.counts["5 Crack"]}</div>
                                    <div>8 Crack:&ensp;{props.counts["8 Crack"]}</div>
                                    <div>3 Crack:&ensp;{props.counts["3 Crack"]}</div>
                                    <div>6 Crack:&ensp;{props.counts["6 Crack"]}</div>
                                    <div>9 Crack:&ensp;{props.counts["9 Crack"]}</div>
                                </div>
                            </div>
                            <div>
                                <p className="tile-counter-category">WINDS</p>
                                <div className="tile-two-col">
                                    <div>North:&ensp;{props.counts["North"]}</div>
                                    <div>East:&ensp;{props.counts["East"]}</div>
                                    <div>South:&ensp;{props.counts["South"]}</div>
                                    <div>West:&ensp;{props.counts["West"]}</div>
                                </div>
                            </div>
                            <div>
                                <p className="tile-counter-category">DRAGONS</p>
                                <div className="tile-one-col">
                                    <div>Green Dragon:&ensp;{props.counts["Green Dragon"]}</div>
                                    <div>Red Dragon:&ensp;{props.counts["Red Dragon"]}</div>
                                    <div>White Dragon:&ensp;{props.counts["White Dragon"]}</div>
                                </div>
                            </div>
                            <div>
                                <p className="tile-counter-category">SPECIAL</p>
                                <div className="tile-one-col">
                                    <div>Flowers:&ensp;{props.counts["Flower"]}</div>
                                    <div>Jokers:&ensp;{props.counts["Joker"]}</div>
                                </div>
                            </div>
                        </>)}
                </div>
            </div >
        </div >
    ) : "";
}