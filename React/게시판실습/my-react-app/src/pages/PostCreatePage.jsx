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
    <div style={{ padding: "20px" }}>
      <h1>새 글 작성하기</h1>

      {/* 1. 인풋칸 만들기: 폼(form) 형태로 감싸서 제출 기능을 만듭니다. */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>제목</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // 글자 타이핑할 때마다 그릇에 담기
            placeholder="제목을 입력하세요"
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>내용</label>
          <br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)} // 글자 타이핑할 때마다 그릇에 담기
            placeholder="내용을 입력하세요"
            required
            style={{ width: "100%", height: "200px", padding: "10px" }}
          />
        </div>

        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          작성 완료
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          style={{ marginLeft: "10px" }}
        >
          취소
        </button>
      </form>
    </div>
  );
};

export default PostCreatePage;
