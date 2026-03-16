import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (loginId === "admin" && password === "1234") {
      alert("로그인 성공!");

      navigate("/", { replace: true });
    } else {
      setIsError(true);
      setLoginId("");
      setPassword("");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "300px",
      }}
    >
      <h2>Login</h2>

      <input
        type="text"
        placeholder="아이디"
        value={loginId}
        onChange={(e) => {
          setLoginId(e.target.value);
          if (isError) setIsError(false); // 다시 입력하기 시작하면 에러 메시지 숨김(센스!)
        }}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (isError) setIsError(false); // 다시 입력하기 시작하면 에러 메시지 숨김
        }}
      />

      {isError && (
        <p style={{ color: "red", fontSize: "14px", margin: "0" }}>
          아이디 또는 비밀번호가 틀렸습니다.
        </p>
      )}

      <button type="submit">로그인</button>
      <button type="button" onClick={() => navigate("/register")}>
        회원가입하러 가기
      </button>
    </form>
  );
};

export default Login;
