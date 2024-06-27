import React from 'react'
import './PopUp.css'

export const PopUp = ({ closePopUp, popUpData }) => {
    return (
        <div className='popUp'>
            <div className='popUpContent'>
                <h2>{popUpData.title}</h2>
                <p>{popUpData.description}</p>
                <button onClick={closePopUp}>Close</button>
            </div>
        </div>
    )
}