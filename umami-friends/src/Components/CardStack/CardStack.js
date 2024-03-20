import React from "react";
import "./CardStack.css";
export const CardStack = props => {
    const getIngredient = () => {
        //add logic for picking up ingredient
        //update game state with a card draw
    };
    //props.ingredient to tell if clickable
    //TODO: find card back images and input
    return (
        <div className="cardStack">
            <div className="cardBackImage" onClick={getIngredient}>
                <div className="card-body">
                    <img
                        className="recipeCard"
                        alt={`${props.name}`}
                        src={require(`../../Pictures/logo.jpg`)}
                    />
                </div>
            </div>
        </div>
    );
};
