import React from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. 준비물: 표지판(Link)과 운전기사(navigate)
import useAuthStore from "../store/useAuthStore"; // 1. 준비물: 로그인 정보가 든 금고 열기

const Header = () => {
  // 1. 흐름 파악: 금고에서 '로그인 여부', '내 정보', '로그아웃 기능'을 꺼냅니다.
  const { isLoggedIn, user, logout } = useAuthStore();
  const navigate = useNavigate();

  // 2. 비유: '로그아웃'은 금고를 비우고 집(홈)으로 보내주는 안내원입니다.
  const handleLogout = () => {
    logout(); // 금고 비우기 (토큰 삭제 등)
    alert("로그아웃 되었습니다.");
    navigate("/",{ replace: true }); // 홈으로 이동
  };

  return (
    <header style={{ 
      padding: "10px 20px", 
      display: "flex", 
      justifyContent: "space-between", 
      backgroundColor: "#f8f9fa",
      borderBottom: "1px solid #ddd" 
    }}>
      {/* 3. 설계 의도: 로고나 홈 버튼은 언제나 왼쪽에 배치합니다. */}
      <div>
        <Link to="/" style={{ fontWeight: "bold", textDecoration: "none", color: "blue" }}>
          홈
        </Link>
      </div>

      {/* 3. 설계 의도: 로그인 상태에 따라 오른쪽 메뉴를 다르게 보여줍니다 (조건부 렌더링). */}
      <nav>
        {isLoggedIn ? (
          // --- 로그인 했을 때 보이는 메뉴 ---
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span><strong>{user?.email}</strong>님</span>
            <button onClick={handleLogout} style={{ cursor: "pointer" }}>
              로그아웃
            </button>
          </div>
        ) : (
          // --- 로그인 안 했을 때 보이는 메뉴 ---
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;