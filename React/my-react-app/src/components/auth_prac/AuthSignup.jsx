// src/components/auth_prac/SignupPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const AuthSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/signup", { email, password });
      alert("회원가입 성공!");
      navigate("/auth/login");
    } catch (err) {
      setError(err.response?.data?.detail || "회원가입 실패");
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
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
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default AuthSignup;
