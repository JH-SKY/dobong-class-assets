// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import LayoutProb from "../laytouts/LayoutProb";
import Cart from "../pagesProb/Cart";
import Home from "../pagesProb/Home";
import Login from "../pagesProb/Login";
import Products from "../pagesProb/Products";
import Register from "../pagesProb/Register";
import SimpleLayout from "../laytouts/SimpleLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutProb />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/product",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/",
    element: <SimpleLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  // { path: "layout-prob", element: <component></component> },
]);

export default router;
