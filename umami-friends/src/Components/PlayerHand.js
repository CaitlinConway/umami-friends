import React from 'react';

export const PlayerHand = ({ playerHand }) => {
    return (
        <div>
            {playerHand.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </div>
    );
};

export default PlayerHand;
