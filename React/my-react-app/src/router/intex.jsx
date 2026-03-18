// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/auth_prac/AuthLayout";
import Home from "../components/auth_prac/AuthHome";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default router;
