import React from "react";
import { useState } from "react";

const Greeting = () => {
  // input태그를 만든다.
  // 태그에 값을 입력한다.
  // 입력된 값이 화면에 출력된다.
  const [name, setName] = useState("");

  return (
    <div className="card">
      <div>Greeting</div>
      <input
        onChange={(event) => setName(event.target.value)}
        className="input"
        type="text"
        value={name}
      />
      <p>안녕하세요 {name}님!</p>
    </div>
  );
};

export default Greeting;
