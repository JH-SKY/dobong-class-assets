import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const LoginPage = () => {
  const navigate = useNavigate();

  const login = useUserStore((state) => state.login);
  const handleLogin = () => {
    // 로그인 처리...
    // alert("로그인 성공! - 즉 무언가의 코드들이 들어갈 수 있다.");
    login();
    navigate("/"); // 홈으로 이동
  };

  return (
    <div>
      <h1>로그인</h1>
      <button className="button" onClick={handleLogin}>
        로그인
      </button>
      <Link to="/">홈으로!</Link>
    </div>
  );
};

export default LoginPage;
