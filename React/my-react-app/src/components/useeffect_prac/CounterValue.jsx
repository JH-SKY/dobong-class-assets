import { useState, useEffect } from "react";

const CounterValue = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`count가 ${count}으로 변경되었습니다!`);
  }, [count]); // ← count가 변경될 때마다 실행

  return (
    <div className="card">
      <p>카운트: {count}</p>
      <button className="button" onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
};

export default CounterValue;
