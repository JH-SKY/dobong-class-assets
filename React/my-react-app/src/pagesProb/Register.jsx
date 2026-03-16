import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const register = () => {
    alert("회원가입완료");
    navigate("/login", { replace: true });
  };
  const backPage = () => {
    navigate(-1);
  };
  return (
    <div>
      <div>Register</div>
      <button onClick={backPage}>뒤로가기</button>
      <button onClick={register}>가입완료</button>
    </div>
  );
};

export default Register;
