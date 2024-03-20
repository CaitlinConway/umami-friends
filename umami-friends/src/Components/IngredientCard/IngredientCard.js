import React from 'react';
import './IngredientCard.css';

// Sample Card with props
// Future improvement could make dynamic so ez change rules instead of static whole card pics

// name: "Bean Burger",
// pictureName: "beanBurger",
// value: {
//     burger: 1,
//     plant: 1,
//     colorless: 0,
//     spicy: 0,
//     noodle: 0,
//     sauce: 0,
//     taco: 0,
//     egg: 0,
//     sweet: 0
// }

export const IngredientCard = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <img
          className="ingredientCard"
          alt={`${props.name}`}
          src={require(`../Pictures/${props.pictureName}.png`)}
        />
      </div>
    </div>
  );
};
