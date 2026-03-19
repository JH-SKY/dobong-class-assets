import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 1. 준비물: 이동을 위한 운전기사 호출
import api from "../api"; // 1. 준비물: 전용 배달원(api.js) 호출
import useAuthStore from "../store/useAuthStore"; // 1. 준비물: 로그인 확인용 금고 열기

const PostCreatePage = () => {
  // 1. 흐름 파악: 입력창에 적힐 '제목'과 '내용'을 담을 빈 그릇(State)을 준비합니다.
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // 2. 비유: "신분증 없으면 입장 불가!" 페이지가 열리자마자 로그인했는지 검사합니다.
  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login"); // 로그인 안 됐으면 로그인 페이지로 튕겨내기
    }
  }, [isLoggedIn, navigate]);

  // 2. 비유: 작성 완료 버튼을 눌렀을 때 실행되는 '배달 주문' 함수입니다.
  const handleSubmit = async (e) => {
    e.preventDefault(); // 설계 의도: 버튼 눌렀을 때 새로고침되는 브라우저 기본 동작을 막습니다.

    try {
      // 설계 의도: 입력한 제목과 내용을 싸서 서버의 /posts 주소로 배달(POST) 보냅니다.
      await api.post("/posts", {
        title: title,
        content: content,
      });

      alert("글이 성공적으로 등록되었습니다!");

      // 3. 일 시키기: 저장이 끝났으니 이제 '글 목록' 페이지로 기사님에게 운전을 시킵니다.
      navigate("/");
    } catch (error) {
      console.error("글 작성 실패", error);
      alert("글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={{ 
      maxWidth: "800px", 
      margin: "0 auto", 
      backgroundColor: "white", 
      padding: "40px", 
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)" 
    }}>
      <h1 style={{ marginBottom: "30px", fontSize: "24px", color: "#222" }}>새 게시글 작성</h1>

      {/* 1. 인풋칸 만들기: 폼(form) 형태로 감싸서 제출 기능을 만듭니다. */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#555" }}>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // 글자 타이핑할 때마다 그릇에 담기
            placeholder="제목을 입력하세요"
            required
            style={{ 
              width: "100%", 
              padding: "12px 15px", 
              borderRadius: "8px", 
              border: "1px solid #ddd",
              fontSize: "16px",
              boxSizing: "border-box", // 패딩이 너비에 영향을 주지 않게 설정
              outline: "none"
            }}
          />
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#555" }}>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)} // 글자 타이핑할 때마다 그릇에 담기
            placeholder="내용을 자유롭게 입력하세요"
            required
            style={{ 
              width: "100%", 
              height: "300px", 
              padding: "15px", 
              borderRadius: "8px", 
              border: "1px solid #ddd",
              fontSize: "16px",
              lineHeight: "1.6",
              boxSizing: "border-box",
              resize: "none", // 사용자가 크기 조절 못 하게 고정
              outline: "none"
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          {/* 설계 의도: 취소 버튼은 눈에 덜 띄게, 작성 완료 버튼은 강조색(파란색)으로 배치합니다. */}
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{ 
              padding: "12px 25px", 
              backgroundColor: "#f5f5f5", 
              color: "#666", 
              border: "none", 
              borderRadius: "8px", 
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            취소
          </button>
          
          <button
            type="submit"
            style={{ 
              padding: "12px 25px", 
              backgroundColor: "#007bff", 
              color: "white", 
              border: "none", 
              borderRadius: "8px", 
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            작성 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreatePage;