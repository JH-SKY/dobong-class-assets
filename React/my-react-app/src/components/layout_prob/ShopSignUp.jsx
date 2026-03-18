import React from "react";
import { useNavigate } from "react-router-dom";

const ShopSignUp = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const signup = () => {
    alert("회원가입 완료!");
    navigate("/layout-prob/login", { replace: true });
  };

  return (
    <div>
      <div>ShopSignUp</div>
      <button className="button" onClick={goBack}>
        뒤로가기
      </button>
      <button className="button" onClick={signup}>
        가입 완료
      </button>
    </div>
  );
};

export default ShopSignUp;
