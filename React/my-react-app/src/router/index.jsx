// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Layout from "../laytouts/Layout";
import LoginPage from "../pages/LoginPage";
import MyPage from "../pages/MyPage";
import ShopLayout from "../components/layout_prob/ShopLayout";
import ShopHome from "../components/layout_prob/ShopHome";
import ShopProducts from "../components/layout_prob/ShopProducts";
import ShopCart from "../components/layout_prob/ShopCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      { path: "mypage", element: <MyPage /> },
    ],
  },
  {
    path: "/layout-prob",
    element: <ShopLayout />,
    children: [
      { path: "home", element: <ShopHome /> },
      { path: "products", element: <ShopProducts /> },
      { path: "cart", element: <ShopCart /> },
    ],
  },
]);

export default router;
