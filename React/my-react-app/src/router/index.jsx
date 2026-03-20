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
import ShopLogin from "../components/layout_prob/ShopLogin";
import ShopSignUp from "../components/layout_prob/ShopSignUp";
import ShopSimpleLayout from "../components/layout_prob/ShopSimpleLayout";
import PostList from "../components/url_data_prac/PostList";
import PostDetail from "../components/url_data_prac/PostDetil";
import ProductList from "../components/url_data_prac/ProductList";
import UserListPage from "../components/url_data_prac/UserListPage";
import UserDetailPage from "../components/url_data_prac/UserDetailPage";
import MovieSearch from "../components/url_data_prac/MovieSearch";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import Account from "../pages/Account";
import NotFound from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage";
import Theme from "../components/zustand_prac/Theme";
import ShoppingList from "../components/zustand_prac/ShoppingList";
import ShoppingCart from "../components/zustand_prac/ShoppingCart";
import ProtectedRoute from "../components/ProtectedRoute";
import AuthLayout from "../components/auth_prac/AuthLayout";
import AuthHome from "../components/auth_prac/AuthHome";
import AuthSignup from "../components/auth_prac/AuthSignup";
import AuthLogin from "../components/auth_prac/AuthLogin";
import AuthProtectedRoute from "../components/auth_prac/AuthProtectedRoute";
import AuthMyPage from "../components/auth_prac/AuthMyPage";
import Chat from "../components/stream_prac/Chat";
import ChatHistory from "../components/stream_prac/ChatHistory";
import AiChatPage from "../components/stream_prac/AiChat";

const authRoute = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    { index: true, element: <AuthHome /> },
    { path: "signup", element: <AuthSignup /> },
    { path: "login", element: <AuthLogin /> },
    {
      element: <AuthProtectedRoute />,
      children: [{ path: "mypage", element: <AuthMyPage /> }],
    },
  ],
};

const mainRoute = {
  path: "/",
  element: <Layout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "chat",
      element: <Chat />,
    },
    {
      path: "chat-history",
      element: <ChatHistory />,
    },
    {
      path: "ai-chat",
      element: <AiChatPage />,
    },
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
    {
      path: "settings",
      element: <Settings />,
      children: [
        {
          index: true,
          element: <Profile />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "account",
          element: (
            //<ProtectedRoute>
            <Account />
            //</ProtectedRoute>
          ),
        },
      ],
    },

    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "mypage",
          element: <MyPage />,
        },
      ],
    },

    {
      path: "posts",
      element: <PostList />,
    },
    {
      path: "posts/:id",
      element: <PostDetail />,
    },
    {
      path: "products",
      element: <ProductList />,
    },
  ],
};
const router = createBrowserRouter([
  mainRoute,
  {
    path: "/layout-prob",
    element: <ShopLayout />,
    children: [
      { path: "home", element: <ShopHome /> },
      { path: "products", element: <ShopProducts /> },
      { path: "cart", element: <ShopCart /> },
    ],
  },
  {
    path: "/layout-prob",
    element: <ShopSimpleLayout />,
    children: [
      { path: "login", element: <ShopLogin /> },
      { path: "signup", element: <ShopSignUp /> },
    ],
  },
  {
    path: "/users",
    element: <UserListPage />,
  },
  {
    path: "/users/:userId",
    element: <UserDetailPage />,
  },
  {
    path: "/movies/search",
    element: <MovieSearch />,
  },
  {
    path: "/theme",
    element: <Theme />,
  },
  {
    path: "/shopping",
    element: <ShoppingList />,
  },
  {
    path: "/shopping-cart",
    element: <ShoppingCart />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  authRoute,
]);

export default router;
