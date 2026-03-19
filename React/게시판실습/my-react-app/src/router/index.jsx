// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import PostList from "../pages/PostList";
import PostDetailPage from "../pages/PostDetailPage";
import PostCreatePage from "../pages/PostCreatePage";
import ChatPage from "../pages/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <PostList /> },
      { path: "signup", element: <SignupPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "posts/:id", element: <PostDetailPage /> },
      { path: "posts/new", element: <PostCreatePage /> },
      { path: "chat/:conversationId", element: <ChatPage /> },
    ],
  },
]);

export default router;
