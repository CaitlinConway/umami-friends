import React from 'react'

const CardStack = (props) => {
    const getIngredient = () => {
        //add logic for picking up ingredient
        //update game state with a card draw
    }
    //props.ingredient to tell if clickable
    //TODO: find card back images and input
    return (
        <div className='cardStack'>
            <div className='cardBackImage' onClick={getIngredient}>PlaceHolder Card</div>
        </div>
    )
}
