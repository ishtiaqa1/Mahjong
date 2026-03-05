import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import "/src/index.css";
import "../page-styles/GamePopup.css";


export default function ReadingGuide(props) {
    const [page, turnPage] = useState(1);
    const minPage = 1;
    const maxPage = 4;

    const pageButton = () => {
        return (<>
            {page !== minPage && <button className='game-popup-button' onClick={() => turnPage(Math.max(minPage, page - 1))}>&#9664;</button>}
            &ensp;
            {page !== maxPage && <button className='game-popup-button' onClick={() => turnPage(Math.min(maxPage, page + 1))}>&#9654;</button>}
        </>)
    }

    return (props.trigger) ? (
        <div className='game-popup' style={{ zIndex: 1015 }}>
            <div className='game-popup-contents'>
                <button className='game-popup-close-button'
                    onClick={() => {
                        turnPage(1);
                        props.setTrigger(false)
                    }}>&#x2716;</button>

                {isMobile ? (<>
                    <h1 style={{ fontSize: 30, marginBottom: 2 }}>How to Read the Score Card</h1>
                    <div className='tile-container'>
                        <div style={{ padding: 0 }} />
                        {page === 1 &&
                            <div>
                                <p className='scorecard-category'>TILE KEY</p>
                                <div className='tile-two-col'>
                                    <div>F</div>    <div>Flower</div>
                                    <div>1-9</div>  <div>Number Tiles<br /><p style={{ margin: 0, fontSize: 14 }}>(Dots, Bams, Cracks)</p></div>
                                </div><p /><div className='tile-two-col'>
                                    <div>D</div>    <div>Dragon</div>
                                    <div>G</div>    <div>Green Dragon</div>
                                    <div>R</div>    <div>Red Dragon</div>
                                    <div>0</div>    <div>White Dragon<br /><p style={{ margin: 0, fontSize: 14 }}>(Soap)</p></div>
                                </div><p /><div className='tile-two-col'>
                                    <div>N</div>    <div>&ensp;North Wind</div>
                                    <div>E</div>    <div>&ensp;East Wind</div>
                                    <div>W</div>    <div>&ensp;West Wind</div>
                                    <div>S</div>    <div>&ensp;South Wind</div>
                                </div>
                                <br />
                                {pageButton()}
                            </div>
                        }
                        {page === 2 &&
                            <div>
                                <p className='scorecard-category'>NUMBER COLORS</p>
                                <div className='tile-one-col'>
                                    <div>
                                        A color (<u>black</u>, <u className='mahjong-green'>green</u>, or <u className='mahjong-red'>red</u>)
                                        represents a suit of tiles. Different colors do not refer to specific suits, but to how many suits are needed in the hand.
                                    </div>
                                    <br />
                                    <div>
                                        11111 2222 333 44
                                        <br />(one suit)
                                    </div>
                                    <div>
                                        FFF <p className='mahjong-red'>1111</p> DDD <p className='mahjong-green'>1111</p>
                                        <br />(two suits)
                                    </div>
                                    <div>
                                        EE <p className='mahjong-red'>222</p> 2222 <p className='mahjong-green'>222</p> WW
                                        <br />(three suits)
                                    </div>
                                </div>
                                <br />
                                {pageButton()}
                            </div>
                        }
                        {page === 3 &&
                            <div>
                                <p className='scorecard-category'>SPECIAL TILE COLORS</p>
                                <div className='tile-one-col'>
                                    <div>Flowers (F) and Winds (N, E, W, S) are always in <u>black</u>. They do not have a suit.</div>
                                    <div>Red Dragons (R) are always in <u className='mahjong-red'>red</u>.
                                        Green Dragons (G) are always in <u className='mahjong-green'>green</u>.</div>
                                    <div>White Dragons as zeroes (0) are always in <u>black</u>. They do not have a suit.</div>
                                    <div>
                                        The general Dragon (D) tile can be shown in <u>black</u>, <u className='mahjong-red'>red</u>,
                                        or <u className='mahjong-green'>green</u>. Like numbered tiles, the colors do <i>not</i> correspond
                                        to specific dragons, but to how many types of dragons are needed in the hand.
                                    </div>
                                </div>
                                <br />
                                {pageButton()}
                            </div>
                        }
                        {page === 4 &&
                            <div>
                                <p className='scorecard-category'>HAND CONDITIONS</p>
                                <div className='tile-one-col'>
                                    <div>
                                        <div>
                                            Some mahjong hands can only use special
                                            types of tiles.
                                        </div><br /><div>
                                            These hands will be
                                            <br /><mark className='winning-hand'>highlighted in green</mark><br />
                                            on your score card.
                                        </div><br /><div>
                                            Clicking on them will
                                            show their details at
                                            the top of the card.
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <p className='scorecard-category'>JOKERS</p>
                                <div className='tile-one-col'>
                                    <div>
                                        Jokers can stand in for 
                                        any tile in a group of 
                                        three or more.
                                    </div>
                                </div>
                                <br />
                                {pageButton()}
                            </div>
                        }
                        <div style={{ padding: 0 }} />
                    </div>
                </>
                ) : (
                    <>
                        <h1 style={{ marginBottom: 2 }}>How to Read the Score Card</h1>
                        <div className='tile-container'>
                            <div>
                                <p className='scorecard-category'>TILE KEY</p>
                                <div className='tile-two-col'>
                                    <div>F</div>    <div>Flower</div>
                                    <div>1-9</div>  <div>Number Tiles<br /><p style={{ margin: 0, fontSize: 14 }}>(Dots, Bams, Cracks)</p></div>
                                </div><p style={{ margin: 12 }} /><div className='tile-two-col'>
                                    <div>D</div>    <div>Dragon</div>
                                    <div>G</div>    <div>Green Dragon</div>
                                    <div>R</div>    <div>Red Dragon</div>
                                    <div>0</div>    <div>White Dragon<br /><p style={{ margin: 0, fontSize: 14 }}>(Soap)</p></div>
                                </div><p style={{ margin: 12 }} /><div className='tile-two-col'>
                                    <div>N</div>    <div>&ensp;North Wind</div>
                                    <div>E</div>    <div>&ensp;East Wind</div>
                                    <div>W</div>    <div>&ensp;West Wind</div>
                                    <div>S</div>    <div>&ensp;South Wind</div>
                                </div>
                            </div>
                            <div>
                                <p className='scorecard-category'>NUMBER COLORS</p>
                                <div className='tile-one-col'>
                                    <div>
                                        A color (<u>black</u>, <u className='mahjong-green'>green</u>, or <u className='mahjong-red'>red</u>)
                                        represents a suit of tiles. Different colors do not
                                        <br />refer to specific suits, but to how many suits are needed in the hand.
                                    </div>
                                    <div className='tile-three-col'>
                                        <div>
                                            11111 2222 333 44
                                            <br />(one suit)
                                        </div>
                                        <div>
                                            FFF <p className='mahjong-red'>1111</p> DDD <p className='mahjong-green'>1111</p>
                                            <br />(two suits)
                                        </div>
                                        <div>
                                            EE <p className='mahjong-red'>222</p> 2222 <p className='mahjong-green'>222</p> WW
                                            <br />(three suits)
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <p className='scorecard-category'>SPECIAL TILE COLORS</p>
                                    <div className='tile-one-col'>
                                        <div>Flowers (F) and Winds (N, E, W, S) are always in <u>black</u>. They do not have a suit.</div>
                                        <br />
                                        <div>Red Dragons (R) are always in <u className='mahjong-red'>red</u>.
                                            Green Dragons (G) are always in <u className='mahjong-green'>green</u>.</div>
                                        <div>White Dragons as zeroes (0) are always in <u>black</u>. They do not have a suit.</div>
                                        <br />
                                        <div>
                                            The general Dragon (D) tile can be shown in <u>black</u>, <u className='mahjong-red'>red</u>,
                                            or <u className='mahjong-green'>green</u>.
                                            <br />Like numbered tiles, the colors do <i>not</i> correspond to specific dragons,
                                            <br />but to how many types of dragons are needed in the hand.
                                        </div>
                                        <p style={{ margin: 2.5 }} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='scorecard-category'>HAND CONDITIONS</p>
                                <div className='tile-one-col'>
                                    <div>
                                        <div>
                                            Some mahjong hands
                                            <br />can only use special
                                            <br />types of tiles.
                                        </div><div>
                                            <br />These hands will be
                                            <br /><mark className='winning-hand'>highlighted in green</mark>
                                            <br />on your score card.
                                        </div><div>
                                            <br />Clicking on them will
                                            <br />show their details at
                                            <br />the top of the card.
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <p className='scorecard-category'>JOKERS</p>
                                <div className='tile-one-col'>
                                    <div>
                                        Jokers can stand in for
                                        <br />any tile in a group of
                                        <br />three or more.
                                    </div>
                                    <p style={{ margin: 2.8 }} />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    ) : "";
}