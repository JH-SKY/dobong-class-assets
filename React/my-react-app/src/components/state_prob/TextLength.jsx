import React, { useState } from "react";

const TextLength = () => {
  // input태그에 텍스트를 입력하면
  // -> input태그가 존재하는구나
  // -> input태그에대해 입력 이벤트가 존재하는구나.

  // 글자수가 표시된다
  // 이벤트에 대해서 값이 변하니까 state다.

  const [text, setText] = useState("");

  return (
    <div className="card">
      <div>TextLength</div>
      <input
        onChange={(e) => {
          setText(e.target.value);
        }}
        type="text"
        className="input"
      />

      <div>
        글자 : {text} / 글자수 : {text.length}
      </div>
    </div>
  );
};

export default TextLength;
