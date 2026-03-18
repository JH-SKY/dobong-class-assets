import { Navigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const MyPage = () => {
  // const isLoggedIn = false;
  // const isLoggedIn = true;

  // const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  // if (!isLoggedIn) {
  //   return <Navigate to="/login" replace />;
  // }

  return <h1>마이 페이지</h1>;
};

export default MyPage;
