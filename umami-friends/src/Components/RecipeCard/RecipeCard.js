import React from "react";
import './RecipeCard.css'
// Sample Card with props
// Future improvement could make dynamic so ez change rules instead of static whole card pics

// name: "Spring Roll",
// pictureName: "springRoll",
// points: 2,
// status: "basicPlant",
// cost: {
//     redTriangle: 1,
//     greenCircle: 3
// },
// energy: 1,
// description: "Place 2 ingredients from your hand onto your board. Refresh. All other players draw +1 card",
// actions: ["energy1", "placeIngredients2", "otherPlayersDraw"]


export const RecipeCard = (props) => {
    return (
        <div className="card">
            <div className="card-body">
                <img className='recipeCard' alt={`${props.name}`} src={require(`../Pictures/${props.pictureName}.png`)} />
            </div>
        </div>
    );
}
