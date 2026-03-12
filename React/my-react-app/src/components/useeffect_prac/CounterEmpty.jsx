import { useState, useEffect } from "react";

const CounterEmpty = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("처음 한 번만 실행됩니다!");
  }, []); // ← 빈 배열: 처음 1번만 실행

  return (
    <div className="card">
      <p>카운트: {count}</p>
      <button className="button" onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
};

export default CounterEmpty;
