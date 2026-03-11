import React, { useState } from "react";
// 로그인 폼을 만드시오. { id: "", password: "" }
//  객체 State와 하나의 handleChange 함수로 두 input을 모두 처리하시오.
// "로그인" 버튼을 누르면 alert으로 입력값을 보여주시오

const LoginForm = () => {
  const [login, setLogin] = useState({ id: "", password: "" });

  const handleInput = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    alert(`아이디: ${login.id}\n비밀번호: ${login.password}`);

    setLogin({ id: "", password: "" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="card">
      로그인 폼 <br />
      ID :
      <input
        className="input"
        name="id"
        placeholder="아이디"
        value={login.id}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      PW :
      <input
        className="input"
        name="password"
        placeholder="비밀번호"
        value={login.password}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      <button className="button" onClick={handleSubmit}>
        로그인
      </button>
    </div>
  );
};

export default LoginForm;
