// src/components/auth_prac/LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user); // user도 추가!
  const navigate = useNavigate();
  // ---------------------------------------------------------
  // [추가된 로직] 2. 비유: 매표소 입구에서 '이미 입장 팔찌를 찼는지' 검사하는 감시원이에요.
  useEffect(() => {
    if (isLoggedIn && user) {
      // 3. 설계 의도: 이미 로그인된 상태라면 굳이 로그인 페이지를 보여줄 필요가 없으니 메인으로 보냅니다.
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, user, navigate]);
  // ---------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "로그인 실패");
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
