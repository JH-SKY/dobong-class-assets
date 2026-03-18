// 1. 준비물: useEffect를 반드시 추가해야 에러가 안 납니다!
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      setError(err.response?.data?.detail || "회원가입 실패");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            required
            style={{ padding: "8px", width: "200px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
            style={{ padding: "8px", width: "200px" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          회원가입 완료
        </button>
      </form>
    </div>
  );
};

export default SignupPage;