import { useState, useRef } from "react";

const Counter = () => {
  const [render, setRender] = useState(false);
  let count = 0; // 리렌더링될 때마다 0으로 초기화됨
  const countRef = useRef(0); // 리렌더링되어도 값이 유지됨

  const handleLetClick = () => {
    count += 1;
    console.log("let:", count);
  };

  const handleRefClick = () => {
    countRef.current += 1;
    console.log("useRef:", countRef.current);
  };

  return (
    <div className="card">
      <button className="button" onClick={handleLetClick}>
        let 증가
      </button>
      <button className="button" onClick={handleRefClick}>
        useRef 증가
      </button>
      <button className="button" onClick={() => setRender(!render)}>
        리렌더링
      </button>
    </div>
  );
};

export default Counter;
