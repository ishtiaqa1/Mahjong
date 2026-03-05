import { Link } from "react-router-dom";


export default function TutorialWin() {
    return (
        <div className="center-block">
            <div className='game-board'>
                <button className='game-tab score-card-tab'>&ensp;&ensp;&ensp;</button>
                <button className='game-tab'>&ensp;&ensp;&ensp;</button>
                <button className='game-tab tile-counter-tab'>&ensp;&ensp;&ensp;</button>

                <div className='name-label down-label'>&ensp;&ensp;&ensp;</div>
                <div className='tile-rack down-exposed' />
                <div className='tile-rack down-divider' />
                <div className='tile-rack down-hidden' />

                <div className='name-label left-label'>&ensp;&ensp;&ensp;</div>
                <div className='tile-rack left-exposed' />
                <div className='tile-rack left-divider' />
                <div className='tile-rack left-hidden' />

                <div className='name-label right-label'>&ensp;&ensp;&ensp;</div>
                <div className='tile-rack right-exposed' />
                <div className='tile-rack right-divider' />
                <div className='tile-rack right-hidden' />

                <div className='name-label across-label'>&ensp;&ensp;&ensp;</div>
                <div className='tile-rack across-exposed' />
                <div className='tile-rack across-divider' />
                <div className='tile-rack across-hidden' />
                <div className='tpb'>
                    <div className='tpc win'>
                        <br />
                        <h1>Congratulations!</h1>
                        <br />
                        <p>You won the game and have beaten the tutorial level!</p>
                        <p>Now that you know all the basics, you're ready to get out there and play some real mahjong games!</p>
                        <p>You can come back and replay this tutorial any time you like, or check out
                            the <Link to="/instructions" className="tp-instructions-link">
                                Instructions
                            </Link> page
                            for more information.</p>
                        <br />
                        <p>Good luck, and happy playing!</p>
                        <br />
                        <Link to='/'>
                            <button className="tpbutton">RETURN TO HOMEPAGE</button>
                        </Link>
                        <br /><br />
                    </div>
                </div>
            </div>

            {/* Return Button */}
            <Link to="/instructions" className="back-home">
                <span className="back-button tutorial-bb">&#8617;</span>
            </Link>
        </div>
    )
}