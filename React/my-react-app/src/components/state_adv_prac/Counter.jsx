import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  // ❌ 3씩 증가하지 않는다
  const increaseWrong = () => {
    setCount(count + 1); // count = count + 1
    setCount(count + 1); // count = count + 1
    setCount(count + 1); // count = count + 1
  };

  // ✅ 3씩 증가한다
  const increaseCorrect = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button className="button" onClick={increaseWrong}>
        +3 (잘못된 방법)
      </button>
      <button className="button" onClick={increaseCorrect}>
        +3 (올바른 방법)
      </button>
    </div>
  );
};

export default Counter;
