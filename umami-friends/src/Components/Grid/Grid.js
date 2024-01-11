import React from "react";
import { default as useGameConditions } from '../../Hooks/useGameConditions'
import './Grid.css'
import { Tooltip } from 'react-tooltip';

export const Grid = (props) => {
    const { gameState } = useGameConditions()
    const { basicRecipes, rareRecipes } = gameState
    return (
        <div className="grid-container">
            {Object.keys(basicRecipes).map((recipe, index) => {
                const img = require(`../../Pictures/${recipe}.png`)
                return (
                    <div className='grid-item' key={index}>
                        <img data-tooltip-id={`imageTooltip${index}`} className='recipeCard' alt={`${recipe}`} src={img} />
                        <Tooltip className='tooltip'
                            id={`imageTooltip${index}`}
                            place="bottom"
                            data-tooltip-position-strategy="fixed"
                            border={"none"}
                            opacity={1}
                        >
                            <img className='hoveredImage' alt={`${recipe}`} src={img} />
                        </Tooltip>
                    </div>
                )
            })}
            {rareRecipes.map((recipe, index) => {
                const img = require(`../../Pictures/${recipe.pictureName}.png`)
                return (
                    <div className='grid-item' key={index}>
                        <img data-tooltip-id={`imageTooltip${index}`} className='recipeCard' alt={`${recipe}`} src={img} />
                        <Tooltip className='tooltip'
                            id={`imageTooltip${index}`}
                            place="bottom"
                            data-tooltip-position-strategy="fixed"
                            border={"none"}
                            opacity={1}
                        >
                            <img className='hoveredImage' alt={`${recipe}`} src={img} />
                        </Tooltip>
                    </div>
                )
            })}
        </div>
    );
};
