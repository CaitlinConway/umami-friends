import React from "react";

export const Header = (props) => {
    return (
        <div className="header">
            <div className="header-text">
                <div className="header-title">Umami Friends</div>
                <div className="header-subtitle">A game of culinary creation</div>
                <button onClick={props.startGame}>Start Game</button>
                <div className='header-userName'>User: {props.userName}</div>
                <div className='header-roomCode'>Room Code: {props.roomCode}</div>
            </div>
        </div>
    );
}
