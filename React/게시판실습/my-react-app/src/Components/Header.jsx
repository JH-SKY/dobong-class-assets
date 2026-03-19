import React, { useEffect, usestate } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Header = () => {
  const { isLoggedIn, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // [설계 의도]: 레이아웃이 렌더링될 때(앱 시작/새로고침)
    // "나 누군지 알려줘" 기능을 딱 한 번 실행해서 user 정보를 채웁니다.
    checkAuth();
  }, [checkAuth]);

  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다.");
    navigate("/", { replace: true });
  };

  return (
    <header
      style={{
        padding: "0 40px",
        height: "70px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)", // 비유: 그림자를 살짝 넣어 입체감을 줘요.
        position: "sticky", // 설계 의도: 스크롤을 내려도 메뉴바가 위에 딱 붙어있게 합니다.
        top: 0,
        zIndex: 1000,
      }}
    >
      <div>
        {/* 1. 준비물 찾기: 로고 역할을 하는 홈 버튼입니다. 파란색(#007bff)으로 강조했어요. */}
        <Link
          to="/"
          style={{
            fontSize: "24px",
            fontWeight: "800",
            textDecoration: "none",
            color: "#007bff",
            letterSpacing: "-1px",
          }}
        >
          새싹 게시판
        </Link>
      </div>

      <nav>
        {isLoggedIn ? (
          // 2. 비유: 로그인 상태일 때는 '유저 이메일'과 '퇴근(로그아웃) 버튼'을 보여줍니다.
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ color: "#444", fontSize: "14px" }}>
              <strong style={{ color: "#222" }}>{user?.email}</strong>님
              어서오쇼
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
                transition: "all 0.2s", // 마우스 올렸을 때 반응하도록 설정
              }}
            >
              로그아웃
            </button>
          </div>
        ) : (
          // 3. 설계 의도: 비회원일 때는 가입과 로그인을 권유하는 버튼을 나란히 둡니다.
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#666",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              로그인
            </Link>
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "#fff",
                backgroundColor: "#007bff",
                padding: "8px 20px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              시작하기
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
