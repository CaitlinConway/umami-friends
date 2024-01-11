import React from 'react';

export const PlayerBoard = (props) => {
    const { playerBoard } = props;

    return (
        <div>
            {Object.entries(playerBoard).map(([key, value]) => (
                <div key={key}>
                    <span>{key}: </span>
                    <span>{value}</span>
                </div>
            ))}
        </div>
    );
};

export default PlayerBoard;
