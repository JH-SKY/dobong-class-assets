import React from "react";
import { useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";

const ShopLogin = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    console.log(id, password);

    // axios 요청에 해당합니다.
    if (id === "admin" && password === "1234") {
      console.log("성공");
      alert("로그인 성공");
      navigate("/layout-prob/home", { replace: true });

      return;
    }
    console.log("실패");
    setPassword("");
    setError(true);
  };
  return (
    <>
      <div>ShopLogin</div>
      <form onSubmit={(e) => login(e)}>
        <label htmlFor="">
          id{" "}
          <input
            type="text"
            className="input"
            onChange={(e) => setId(e.target.value)}
            value={id}
          />
        </label>
        <label htmlFor="">
          password{" "}
          <input
            type="password"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button className="button">로그인</button>
        {error && (
          <span className="text-red-400">비밀번호 또는 아이디가 잘못됨!</span>
        )}
      </form>
      <Link className="button" to="/layout-prob/signup">
        회원가입하기
      </Link>
    </>
  );
};

export default ShopLogin;
