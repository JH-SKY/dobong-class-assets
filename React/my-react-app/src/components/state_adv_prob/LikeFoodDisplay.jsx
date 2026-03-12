import React from "react";
import LikeFoodDisplayItem from "./LikeFoodDisplayItem";

const LikeFoodDisplay = ({ foods, handleDelete, handleLike }) => {
  return (
    <div className="card">
      <div>LikeFoodDisplay</div>
      <ul>
        {foods.map((food) => {
          return (
            // <li key={food.id}>
            //   {food.name}
            //   <button onClick={() => handleLike(food.id)} className="button">
            //     {food.liked ? "♥️" : "🤍"}
            //   </button>
            //   <button onClick={() => handleDelete(food.id)} className="button">
            //     X
            //   </button>
            // </li>
            <LikeFoodDisplayItem
              food={food}
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default LikeFoodDisplay;
