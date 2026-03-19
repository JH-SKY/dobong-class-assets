import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const login = useAuthStore((state) => state.login);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  // 1. 설계 의도: 이미 입장권(로그인)이 있는 사람은 홈으로 돌려보내는 '감시원'입니다.
  useEffect(() => {
    if (isLoggedIn && user) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, user, navigate]);

  // 2. 비유: 버튼을 누르면 서버에 배달(로그인 요청)을 보내는 '주문서' 제출 함수입니다.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "70vh" // 설계 의도: 화면 중간에 로그인 박스가 오도록 높이를 조절해요.
    }}>
      <div style={{ 
        width: "100%", 
        maxWidth: "400px", 
        backgroundColor: "white", 
        padding: "40px", 
        borderRadius: "16px", 
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        textAlign: "center"
      }}>
        <h1 style={{ marginBottom: "10px", fontSize: "28px", color: "#333" }}>로그인</h1>
        <p style={{ color: "#777", marginBottom: "30px", fontSize: "14px" }}>서비스 이용을 위해 로그인해주세요.</p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "600", color: "#555" }}>이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              style={{ 
                width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", 
                boxSizing: "border-box", outline: "none", fontSize: "15px"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "600", color: "#555" }}>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ 
                width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", 
                boxSizing: "border-box", outline: "none", fontSize: "15px"
              }}
            />
          </div>

          {error && <p style={{ color: "#ff4d4f", fontSize: "13px", marginBottom: "15px" }}>{error}</p>}

          <button type="submit" style={{ 
            width: "100%", padding: "12px", backgroundColor: "#007bff", color: "white", 
            border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "600", cursor: "pointer",
            marginBottom: "20px"
          }}>
            로그인하기
          </button>
        </form>

        <div style={{ fontSize: "14px", color: "#666" }}>
          계정이 없으신가요?{" "}
          <Link to="/signup" style={{ color: "#007bff", textDecoration: "none", fontWeight: "600" }}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;