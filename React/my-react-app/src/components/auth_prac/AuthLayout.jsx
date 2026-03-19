// src/components/auth_prac/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "./Header";

const AuthLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default AuthLayout;
