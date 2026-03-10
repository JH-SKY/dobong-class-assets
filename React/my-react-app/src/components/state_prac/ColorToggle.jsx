import React from "react";
import { useState } from "react";

const ColorToggle = () => {
  const [color, setColor] = useState("white");
  const handleToggle = () => {
    setColor(color === "white" ? "lightblue" : "white");
  };
  return (
    <div
      className="card"
      style={{ backgroundColor: color, height: "100px", padding: "50px" }}
    >
      <button
        className="button"
        onClick={handleToggle}
        style={{ backgroundColor: "white", color: "black" }}
      >
        배경색 바꾸기(눌러!)
      </button>
    </div>
  );
};

export default ColorToggle;
