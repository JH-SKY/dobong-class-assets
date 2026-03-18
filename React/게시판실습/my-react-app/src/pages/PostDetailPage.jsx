import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 1. 준비물: 주소창 번호 읽기(useParams), 운전기사(useNavigate)
import api from "../api";
import useAuthStore from "../store/useAuthStore";

const PostDetailPage = () => {
  // 1. 흐름 파악: 주소창(/posts/1)에서 숫자 '1'만 쏙 뽑아와서 id라는 변수에 담습니다.
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // 서버에서 받아온 글 하나를 담을 그릇
  const user = useAuthStore((state) => state.user); // 금고에서 '내 정보' 꺼내기

  // 2. 비유: 페이지가 열리자마자 배달원(api)에게 "id번 글 좀 가져다줘"라고 심부름을 시킵니다.
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // 설계 의도: 주소창에 있는 id를 사용해 서버에 정확한 데이터를 요청합니다.
        const response = await api.get(`/posts/${id}`);
        setPost(response.data); // 배달 완료된 데이터를 그릇에 담기
      } catch (error) {
        console.error("글 가져오기 실패", error);
        alert("글을 찾을 수 없습니다.");
        navigate("/"); // 글이 없으면 목록으로 돌아가기
      }
    };
    fetchPost();
  }, [id]); // id가 바뀔 때마다(다른 글 클릭 시) 다시 실행합니다.

  // 2. 비유: 삭제 버튼을 눌렀을 때 실행되는 '청소부' 함수입니다.
  const handleDelete = async () => {
    // window.confirm은 브라우저가 띄워주는 "진짜 할래?" 물음표 창이에요.
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        // 설계 의도: 서버에 이 번호(id)의 글을 지워달라고 요청(DELETE)합니다.
        await api.delete(`/posts/${id}`);
        alert("삭제되었습니다.");
        navigate("/"); // 삭제 성공 후 목록으로 자동 이동(운전기사 일 시키기)
      } catch (error) {
        alert("삭제 권한이 없거나 오류가 발생했습니다.");
      }
    }
  };

  // 3. 설계 의도: 데이터가 배달되는 동안(null일 때) 화면이 깨지지 않게 방어막을 칩니다.
  if (!post) return <div>데이터를 불러오는 중입니다...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{post.title}</h1>

      {/* 2. 비유: 'toLocaleString'은 컴퓨터용 날짜를 우리가 읽는 한국말 날짜로 번역해주는 통역사입니다. */}
      <p>
        <strong>작성자:</strong> {post.author.email}
      </p>
      <p>
        <strong>작성일:</strong> {new Date(post.created_at).toLocaleString()}
      </p>

      <hr />

      {/* 설계 의도: 글 내용이 길어도 줄바꿈이 잘 보이게 스타일을 줍니다. */}
      <div style={{ minHeight: "200px", whiteSpace: "pre-wrap" }}>
        {post.content}
      </div>

      {/* 3. 설계 의도: '내 이메일'과 '글쓴이 이메일'이 똑같을 때만 삭제 버튼이라는 특권을 보여줍니다. */}
      {user && user.email === post.author.email && (
        <button
          onClick={handleDelete}
          style={{ marginTop: "20px", color: "red", cursor: "pointer" }}
        >
          삭제하기
        </button>
      )}

      <button onClick={() => navigate("/")} style={{ marginLeft: "10px" }}>
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default PostDetailPage;
