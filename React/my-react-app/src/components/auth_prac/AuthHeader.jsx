// src/components/auth_prac/Header.jsx
import { Link } from "react-router-dom";

const AuthHeader = () => {
  return (
    <header>
      <Link to="/">홈</Link>
      <Link to="/login">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </header>
  );
};

export default AuthHeader;