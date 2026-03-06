import React from "react";

/* 
이런 주석도 가능합니다.
*/

const Hello = () => {
  return (
    // class -> className
    <div className="container">
      <h1>환영합니다!</h1>
      {/* image, input 태그들은 닫아줘야한다. */}
      <img src="https://i.imgur.com/7vQD0fPs.jpg" alt="대체텍스트" />
      <input type="text" name="username" id="username" />
      {/* for의 경우 htmlFor로 변경 */}
      <label htmlFor="username">사용자 이름</label>
    </div>
  );
};

export default Hello;
