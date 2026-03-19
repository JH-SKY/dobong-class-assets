import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import api from "../api";
import useAuthStore from "../store/useAuthStore";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null); 
  const user = useAuthStore((state) => state.user); 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data); 
      } catch (error) {
        console.error("글 가져오기 실패", error);
        alert("글을 찾을 수 없습니다.");
        navigate("/"); 
      }
    };
    fetchPost();
  }, [id, navigate]); 

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await api.delete(`/posts/${id}`);
        alert("삭제되었습니다.");
        navigate("/"); 
      } catch (error) {
        alert("삭제 권한이 없거나 오류가 발생했습니다.");
      }
    }
  };

  if (!post) return (
    <div style={{ textAlign: "center", padding: "100px", color: "#666" }}>
      데이터를 불러오는 중입니다...
    </div>
  );

  return (
    <div style={{ 
      maxWidth: "900px", 
      margin: "0 auto", 
      backgroundColor: "white", 
      padding: "50px", 
      borderRadius: "16px",
      boxShadow: "0 4px 30px rgba(0,0,0,0.05)"
    }}>
      {/* 1. 설계 의도: 제목을 크고 굵게 배치하여 가독성을 높입니다. */}
      <h1 style={{ fontSize: "32px", color: "#111", marginBottom: "20px", lineHeight: "1.3" }}>
        {post.title}
      </h1>

      {/* 2. 비유: 작성자 정보와 날짜는 '메타 정보'라고 하며, 연한 회색으로 배경을 깔아 구분해 줍니다. */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        padding: "15px 0",
        borderBottom: "1px solid #eee",
        marginBottom: "30px",
        color: "#777",
        fontSize: "14px"
      }}>
        <span><strong>작성자:</strong> {post.author.email}</span>
        <span><strong>작성일:</strong> {new Date(post.created_at).toLocaleString()}</span>
      </div>

      {/* 3. 설계 의도: 글 본문은 pre-wrap을 사용하여 줄바꿈과 공백이 그대로 보이게 합니다. */}
      <div style={{ 
        minHeight: "300px", 
        whiteSpace: "pre-wrap", 
        fontSize: "17px", 
        lineHeight: "1.8", 
        color: "#333" 
      }}>
        {post.content}
      </div>

      {/* 4. 일 시키기: 하단 버튼 영역입니다. 삭제 버튼은 빨간색으로 경고의 의미를 줍니다. */}
      <div style={{ 
        marginTop: "50px", 
        paddingTop: "30px", 
        borderTop: "1px solid #eee", 
        display: "flex", 
        justifyContent: "space-between" 
      }}>
        <button 
          onClick={() => navigate("/")} 
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#f0f0f0", 
            border: "none", 
            borderRadius: "8px", 
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          목록으로 돌아가기
        </button>

        {user && user.email === post.author.email && (
          <button
            onClick={handleDelete}
            style={{ 
              padding: "10px 20px", 
              backgroundColor: "#fff1f0", 
              color: "#ff4d4f", 
              border: "1px solid #ffccc7", 
              borderRadius: "8px", 
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            삭제하기
          </button>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;