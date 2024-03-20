import React from "react";
import "./RecipeCard.css";
// Sample Card with props
// Future improvement could make dynamic so ez change rules instead of static whole card pics

// {
//     "name": "Healthy Snack",
//     "pictureName": "healthySnack",
//     "points": 1,
//     "status": "basicPlant",
//     "cost": {
//       "ingredientPlant": 2
//     },
//     "energy": 1,
//     "description": "All other players draw +1 card.",
//     "actions": ["Snack"],
//     "pileCount": 6
//   },

export const RecipeCard = props => {
    return (
        <div className="card">
            <div className="card-body">
                <img
                    className="recipeCard"
                    alt={`${props.name}`}
                    src={require(`../Pictures/${props.pictureName}.png`)}
                />
            </div>
        </div>
    );
};
