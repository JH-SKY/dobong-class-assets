// 1. 준비물 챙기기: '로그인 금고'와 '다른 길로 보내기(Navigate)' 도구를 가져와요.
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  // 2. 비유: 금고를 열어서 'isLoggedIn'이라는 통행증이 있는지 확인해요.
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // 3. 설계 의도: 통행증이 없으면(false) 로그인 페이지로 돌려보내고, 있으면 원래 가려던 곳(children)을 보여줍니다.
  if (!isLoggedIn) {
    alert("로그인이 필요한 서비스입니다!");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;