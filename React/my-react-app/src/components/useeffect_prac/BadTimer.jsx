// BadTimer.jsx
// ❌ 정리 함수가 없는 경우 - 컴포넌트가 사라져도 타이머가 계속 실행된다
import { useState, useEffect } from "react";

const BadTimer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      console.log("❌ 타이머 실행 중..."); // 컴포넌트가 사라져도 계속 출력된다
      setSeconds((prev) => prev + 1);
    }, 1000);
  }, []);

  return <p>❌ {seconds}초 경과</p>;
};

export default BadTimer;
