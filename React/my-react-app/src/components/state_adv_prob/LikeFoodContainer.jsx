import React, { useState } from "react";
import LikeFoodInput from "./LikeFoodInput";
import LikeFoodDisplay from "./LikeFoodDisplay";

const LikeFood = () => {
  const [foods, setFoods] = useState([
    {
      id: 1,
      name: "치킨",
      liked: false,
    },
    {
      id: 2,
      name: "피자",
      liked: false,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      setInput("");
      return;
    }
    setFoods([...foods, { id: Date.now(), name: input, liked: false }]);
    setInput("");
  };

  const handleDelete = (id) => {
    console.log("삭제");
    // 나빼고 다 넣어줘.
    setFoods(foods.filter((food) => food.id !== id));
  };

  const handleLike = (id) => {
    // 나는 바꿔줘. 딴애들은 유지해줘.
    setFoods(
      foods.map((food) => {
        return food.id === id ? { ...food, liked: !food.liked } : food;
      }),
    );
  };

  return (
    <div className="card">
      <div>LikeFoodContainer</div>
      {/* <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setInput(e.target.value)}
          className="input"
          type="text"
          value={input}
        />
      </form> */}
      <LikeFoodInput
        handleSubmit={handleSubmit}
        setInput={setInput}
        input={input}
      />
      {/* <ul>
        {foods.map((food) => {
          return (
            <li key={food.id}>
              {food.name}
              <button onClick={() => handleLike(food.id)} className="button">
                {food.liked ? "♥️" : "🤍"}
              </button>
              <button onClick={() => handleDelete(food.id)} className="button">
                X
              </button>
            </li>
          );
        })}
      </ul> */}
      <LikeFoodDisplay
        foods={foods}
        handleLike={handleLike}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default LikeFood;
