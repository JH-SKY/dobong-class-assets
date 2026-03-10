import React from "react";

const Counter = () => {
  // 숫자를 하나 만들고
  // 그 숫자를 화면에 보여주고
  // 버튼을 누르면 숫자가 1 증가하는 기능을 만들고 싶다.
  // => user와 interaction을 통해 데이터를 변화시키는 과정.

  let number = 0;
  
  const handleClick = () => {
    number = number + 1;
    console.log(number);
  };
  return (
    <>
      <div>Counter</div>
      <div>숫자 : {number}</div>
      <button onClick={handleClick} className="border px-3 py-1 rounded">
        +1
      </button>
    </>
  );
};

export default Counter;
