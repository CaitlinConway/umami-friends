import React from "react";
import './Header.css'
export const Header = (props) => {
    return (
        <div className="header">
            <div className="header-text">
                <div className="header-title">Umami Friends</div>
                <div className="header-subtitle">A game of culinary creation</div>
                <div className='header-bottom-row'>
                    <div className='header-subtitle'>User: {props.userName}</div>
                    <div className='header-subtitle'>Room Code: {props.roomCode}</div>
                    <button className='header-subtitle' onClick={props.startGame}>Start Game</button>

                </div>
            </div>
        </div>
    );
}
