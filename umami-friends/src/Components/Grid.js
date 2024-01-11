import React from "react";
import { default as useGameConditions } from '../Hooks/useGameConditions'

export const Grid = (props) => {
    const { gameState } = useGameConditions()
    debugger;
    const { basicRecipes, rareRecipes } = gameState
    return (
        <div className="grid-container">
            <div className="basic-Recipes">
                <div>
                    {Object.keys(basicRecipes).map((recipe, index) => {
                        return (
                            <div key={index}>
                                <img className='recipeCard' alt={`${recipe}`} src={require(`../Pictures/${recipe}.png`)} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="rare-Recipes">
                <div>
                    {rareRecipes.map((recipe, index) => {
                        return (
                            <div key={index}>
                                <img className='recipeCard' alt={`${recipe}`} src={require(`../Pictures/${recipe.pictureName}.png`)} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
