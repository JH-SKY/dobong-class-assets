// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../store/useUserStore";

// const ProtectedRoute = ({ children }) => {
const ProtectedRoute = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
  //   return children;
};

export default ProtectedRoute;
