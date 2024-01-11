import React from "react";
import { default as useGameConditions } from '../../Hooks/useGameConditions'
import './Grid.css'

export const Grid = (props) => {
    const { gameState } = useGameConditions()
    const { basicRecipes, rareRecipes } = gameState
    return (
        <div className="grid-container">
            {Object.keys(basicRecipes).map((recipe, index) => {
                return (
                    <div key={index}>
                        <img className='recipeCard' alt={`${recipe}`} src={require(`../../Pictures/${recipe}.png`)} />
                    </div>
                )
            })}
            {rareRecipes.map((recipe, index) => {
                return (
                    <div key={index}>
                        <img className='recipeCard' alt={`${recipe}`} src={require(`../../Pictures/${recipe.pictureName}.png`)} />
                    </div>
                )
            })}
        </div>
    );
};
