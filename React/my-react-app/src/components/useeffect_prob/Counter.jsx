import React, { useState } from "react";
import { useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("앱이 시작되었습니다!");
  }, []);

  return (
    <div className="card">
      <div>Counter</div>
      <div>{count}</div>
      <button className="button" onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
};

export default Counter;
