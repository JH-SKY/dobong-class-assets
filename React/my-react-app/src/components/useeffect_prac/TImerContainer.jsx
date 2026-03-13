// TimerContainer.jsx
import { useState } from "react";
import BadTimer from "./BadTimer";
import GoodTimer from "./GoodTimer";

const TimerContainer = () => {
  const [showTimers, setShowTimers] = useState(true);

  return (
    <div>
      <button onClick={() => setShowTimers(!showTimers)}>
        타이머 {showTimers ? "숨기기" : "보이기"}
      </button>
      {showTimers && (
        <div>
          <BadTimer />
          <GoodTimer />
        </div>
      )}
    </div>
  );
};

export default TimerContainer;
