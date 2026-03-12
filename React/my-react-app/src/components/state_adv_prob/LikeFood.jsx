import React, { useState } from "react";

const LikeFood = () => {
  const [foods, setFoods] = useState(["치킨", "피자"]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFoods([...foods, input]);
    setInput("");
  };

  return (
    <div className="card">
      <div>LikeFood</div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setInput(e.target.value)}
          className="input"
          type="text"
          value={input}
        />
      </form>
      <ul>
        {foods.map((food) => {
          return <li>{food}</li>;
        })}
      </ul>
    </div>
  );
};

export default LikeFood;
