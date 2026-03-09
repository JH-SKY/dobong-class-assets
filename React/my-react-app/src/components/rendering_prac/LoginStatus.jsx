import React from "react";

const LoginStatus = ({ isLogin }) => {
  return (
    <div className="card">
      <div>LoginStatus</div>
      <h1>로그인 상태: {isLogin ? "로그인" : "로그아웃"}</h1>
      <p>{isLogin ? "환영합니다!" : "로그인 해주세요."}</p>
      <button className="card">{isLogin ? "로그아웃" : "로그인"}</button>{" "}
    </div>
  );
};

export default LoginStatus;
