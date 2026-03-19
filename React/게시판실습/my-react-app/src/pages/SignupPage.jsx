// 1. 준비물: useEffect를 반드시 추가해야 에러가 안 납니다!
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import useAuthStore from "../store/useAuthStore";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 금고에서 로그인 상태와 유저 정보를 가져옵니다.
  const { isLoggedIn, user } = useAuthStore();

  // 2. 비유: 이미 입장권을 가진 사람이 가입 페이지에 오면 홈으로 돌려보내요.
  useEffect(() => {
    // 설계 의도: 로그인도 되어 있고 유저 정보도 확실히 있을 때만 홈으로 보냅니다.
    if (isLoggedIn && user) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 설계 의도: 서버에 회원가입 요청을 보냅니다.
      await api.post("/auth/signup", { email, password });
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");

      // 3. 일 시키기: 가입 성공 후 로그인하도록 로그인 페이지로 보냅니다.
      navigate("/login");
    } catch (err) {
      // 비유: 이미 가입된 이메일이거나 비번이 너무 짧으면 에러를 보여줍니다.
      setError(
        err.response?.data?.detail ||
          "회원가입에 실패했습니다. 다시 시도해주세요.",
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "10px", fontSize: "28px", color: "#333" }}>
          회원가입
        </h1>
        <p style={{ color: "#777", marginBottom: "30px", fontSize: "14px" }}>
          새로운 계정을 만들고 서비스를 시작하세요.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "13px",
                fontWeight: "600",
                color: "#555",
              }}
            >
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
                outline: "none",
                fontSize: "15px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "13px",
                fontWeight: "600",
                color: "#555",
              }}
            >
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6자리 이상 입력"
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
                outline: "none",
                fontSize: "15px",
              }}
            />
          </div>

          {error && (
            <p
              style={{
                color: "#ff4d4f",
                fontSize: "13px",
                marginBottom: "15px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#28a745",
              color: "white", // 회원가입은 초록색 계열로 차별화
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            회원가입 완료
          </button>
        </form>

        <div style={{ fontSize: "14px", color: "#666" }}>
          이미 계정이 있으신가요?{" "}
          <Link
            to="/login"
            style={{
              color: "#007bff",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
