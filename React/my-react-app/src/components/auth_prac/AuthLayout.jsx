// src/components/auth_prac/Layout.jsx
import { Outlet } from "react-router-dom";
import AuthHeader from "./AuthHeader";

const AuthLayout = () => (
  <>
    <AuthHeader />
    <Outlet />
  </>
);

export default AuthLayout;