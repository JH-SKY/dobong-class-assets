import React from "react";
import { useState } from "react";

const BgChanger = () => {
  // 버튼이 필요하다.
  const [isWhite, setIsWhite] = useState(true);

  const [color, setColor] = useState("white");
//   if white -> blue
//   if blue -> whilte

  return (
    <div className={`card ${isWhite ? "bg-red-200" : "bg-blue-200"}`}>
      <div>BgChanger</div>
      <button
        className={`card ${isWhite ? "bg-blue-200" : "bg-red-200"}`}
        onClick={() => setIsWhite(!isWhite)}
      >
        색 바뀜!
        {isWhite ? "파란색으로" : "빨간색으로"}
      </button>
    </div>
  );
};

export default BgChanger;
