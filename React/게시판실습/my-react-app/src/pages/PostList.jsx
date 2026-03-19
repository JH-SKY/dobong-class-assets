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
      console.log("서버에서 받은 데이터 통째로 보기:", response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("데이터 가져오기 실패", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // [추가된 로직]: AI 챗봇 버튼 클릭 시 동작 (메커니즘)
  const handleStartChat = async () => {
    if (!isLoggedIn) {
      alert("AI 상담소는 로그인 후 이용 가능합니다!");
      return navigate("/login");
    }
    try {
      // 1. 준비물: 새로운 대화 세션을 생성합니다.
      const response = await api.post("/conversations");
      const newRoomId = response.data.id;
      // 2. 일 시키기: 생성된 방 번호를 가지고 채팅 페이지로 이동합니다.
      navigate(`/chat/${newRoomId}`);
    } catch (error) {
      alert("AI 상담원을 불러오지 못했습니다.");
    }
  };

  return (
    <div style={{ padding: "20px", position: "relative", minHeight: "100vh" }}>
      {/* 원본 유지: 제목과 글쓰기 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#333" }}>
          최신 게시글
        </h1>

        {isLoggedIn && (
          <button
            onClick={() => navigate("/posts/new")}
            style={{
              padding: "10px 24px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            + 새 글 작성
          </button>
        )}
      </div>

      {/* 원본 유지: 게시글 그리드 레이아웃 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              border: "1px solid #eee",
              transition: "transform 0.2s",
            }}
          >
            <Link
              to={`/posts/${post.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  marginBottom: "10px",
                  lineHeight: "1.4",
                  cursor: "pointer",
                  color: "#222",
                }}
              >
                {post.title.length > 14 ? post.title.substring(0, 14) + "..." : post.title}
              </h2>
            </Link>

            <div
              style={{
                marginTop: "15px",
                borderTop: "1px solid #f5f5f5",
                paddingTop: "15px",
              }}
            >
              {/* 원본 변수명 유지: post.author.email */}
              <p
                style={{ fontSize: "13px", color: "#666", marginBottom: "5px" }}
              >
                <strong>작성자:</strong> {post.author}
              </p>
              {/* 원본 변수명 유지: post.created_at */}
              <p style={{ fontSize: "12px", color: "#999" }}>
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- 🤖 새로 추가된 귀여운 AI 플로팅 버튼 --- */}
      <div
        onClick={handleStartChat}
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          backgroundColor: "#007bff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(0,123,255,0.3)",
          zIndex: 1000,
        }}
        title="AI 상담원에게 물어보기"
      >
        <span style={{ fontSize: "30px" }}>🤖</span>
      </div>
    </div>
  );
};

export default PostList;
