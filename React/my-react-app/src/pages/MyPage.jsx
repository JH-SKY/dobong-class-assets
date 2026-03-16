import { Navigate } from "react-router-dom";

const MyPage = () => {
  const isLoggedIn = false;
  //   const isLoggedIn = true;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <h1>마이 페이지</h1>;
};

export default MyPage;
