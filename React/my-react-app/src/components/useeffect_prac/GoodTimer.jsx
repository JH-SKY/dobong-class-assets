// GoodTimer.jsx
// ✅ 정리 함수가 있는 경우 - 컴포넌트가 사라지면 타이머도 해제된다
import { useState, useEffect } from "react";

const GoodTimer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      console.log("✅ 타이머 실행 중...");
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      console.log("✅ 타이머 정리!");
      clearInterval(timerId); // 컴포넌트가 사라지면 타이머 해제
    };
  }, []);

  return <p>✅ {seconds}초 경과</p>;
};

export default GoodTimer;
