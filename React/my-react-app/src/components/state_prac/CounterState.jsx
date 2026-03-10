import React from "react";
import { useState } from "react";

const CounterState = () => {
  // 숫자를 하나 만들고
  // 그 숫자를 화면에 보여주고
  // 버튼을 누르면 숫자가 1 증가하는 기능을 만들고 싶다.
  // => user와 interaction을 통해 데이터를 변화시키는 과정.

  let number = 0;

  const handleClick = () => {
    number = number + 1;
    console.log(number);
  };

  const [count, setCount] = useState(0);

  const increateCount = () => {
    setCount(count + 1);
    // count = count + 1
  };
  return (
    <>
      <div>Counter</div>
      <div className="card">
        <div>숫자 : {number}</div>
        <button onClick={handleClick} className="border px-3 py-1 rounded">
          +1
        </button>
      </div>
      <div className="card">
        <div>숫자 : {count}</div>
        <button onClick={increateCount} className="border px-3 py-1 rounded">
          +1
        </button>
      </div>
    </>
  );
};

export default CounterState;
