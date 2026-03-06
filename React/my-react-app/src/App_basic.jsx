import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const name = "홍길동";

  const hello = `나의 이름은 ${name}이야.`;

  // jsx 내부에 변수를 집어넣을 수 있음.
  const helloJsx = <div>나의 이름은 {name}이야.</div>;
  const a = 10;
  const b = 20;
  const divStyle = {
    color: "blue",
    fontSize: "64px",
  };
  return (
    <>
      <div
        style={{
          color: "red",
          fontSize: "32px",
        }}
      >
        스타일 div
      </div>
      <div style={divStyle}>스타일 div2</div>
      {helloJsx}
      {/* 이것이 주석이에요. */}
      <div>나의 이름은 {name}이야!</div>
      <div>1 + 2 = {1 + 2}</div>

      <div>더 큰 수 : {a > b ? a : b}</div>

      <div className="haha" id="haha" onClick={console.log("haha")}>
        안녕하세요
      </div>
      <div>안녕하세요2</div>
      <label htmlFor=""></label>
      <input type="text" />
      <img src="" alt="" />
      <h1></h1>
    </>
  );
}

export default App;
