import React, { useEffect, useState } from "react";
import api from "../api";
import useAuthStore from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");
      console.log(response.data);

      setPosts(response.data);
    } catch (error) {
      console.error("데이터 가져오기 실패", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Post List</h1>
      {isLoggedIn && (
        <button onClick={() => navigate("/posts/new")}>글작성</button>
      )}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              to={`/posts/${post.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h2 style={{ cursor: "pointer" }}>{post.title}</h2>
            </Link>

            <p>{post.created_at}</p>
            <p>{post.author.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
