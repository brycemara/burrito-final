import React, { useState } from "react";

const OrderForm = ({setOrders, orders}) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const handleSubmit = (event) => {
    debugger
    event.preventDefault();

    const newOrder = {
      name: name,
      ingredients: ingredients
    }

    setOrders([...orders, newOrder])

    clearInputs();
  }

  const clearInputs = () => {
    setName('');
    setIngredients([]);
  }

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
        value={ingredient}
        onClick={(event) => setIngredients(event.target.value)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      {ingredientButtons}

      {/* <p>Order: 
        {ingredients || "Nothing selected"}

      </p> */}

      <button onClick={(event) => handleSubmit(event)}>Submit Order</button>
    </form>
  );
};

export default OrderForm;
