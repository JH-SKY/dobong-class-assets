import React from "react";

const LikeFoodDisplayItem = ({ food, handleLike, handleDelete }) => {
  return (
    <li key={food.id}>
      <div className="card">
        {food.name}
        <button onClick={() => handleLike(food.id)} className="button">
          {food.liked ? "♥️" : "🤍"}
        </button>
        <button onClick={() => handleDelete(food.id)} className="button">
          X
        </button>
      </div>
    </li>
  );
};

export default LikeFoodDisplayItem;
