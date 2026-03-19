// src/components/auth_prac/Header.jsx
import { Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header>
      <Link to="/auth">홈</Link>
      <Link to="/auth/mypage">마이페이지</Link>
      {user ? (
        <div>
          <span>{user.email}님</span>
          <button onClick={logout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <Link to="/auth/login">로그인</Link>
          <Link to="/auth/signup">회원가입</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
