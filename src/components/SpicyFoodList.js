import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

// remember that whenever we are updating state
// we always pass a NEW object/array to setState
function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("ALL")

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    console.log(newFood);
    // below we use spread operator to make a COPY of the foods array
    // and insert it into a NEW aaray
    const newFoodArray = [...foods, newFood]
    setFoods(newFoodArray)
  }

  // remove a food object
  // calling .filter will return a NEW array
  //function handleLiClick(id){
  //    const newFoodArray = foods.filter((food) => food.id !== id)
  //    setFoods(newFoodArray)
  //}

  function handleLiClick(id) {
    const newFoodArray = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1
        };
      } else {
        return food;
      }
    });
    setFoods(newFoodArray);
  }

  const foodList = foods.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: { food.heatLevel } | Cuisine: { food.cuisine }
      </li>))

  function handleFilterChange(e){
       setFilterBy(e.target.value)
  }
  
  const foodToDisplay = foods.map((food) => {
    if (filterBy === "ALL"){
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });

  return (
    <div>
      <select name="filter" onChange={handleFilterChange}>
        <option value="ALL">ALL</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
