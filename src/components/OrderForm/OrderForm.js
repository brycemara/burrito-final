import React, { useState } from "react";
import { postOrder } from "../../apiCalls"

const OrderForm = ({setOrders, orders}) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
   
    if (ingredients.length === 0) {
      alert("Must select an ingredient")
      return;
    } 

    const newOrder = {
      id: Date.now(),
      name: name,
      ingredients: ingredients
    }

    postOrder(newOrder)
      
    // POST newOrder if post works then setOrders

    setOrders([...orders, newOrder])

    clearInputs();
  }

  const clearInputs = () => {
    setName('');
    setIngredients([]);
  }

  // CAN I REFACTOR THIS???
  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];

  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        type="button"
        value={ingredient}
        onClick={(event) => setIngredients([...ingredients, event.target.value ])}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      <br></br>

      <label htmlFor="ingredients">Ingredients: </label>
      <section>
        {ingredientButtons}
      </section>

      <p>Order:  
      <br></br>
        { ingredients.join(", ") || " Nothing selected"}
      </p>

      <br></br>
      <button>Submit</button>
    </form>
  );
};

export default OrderForm;
