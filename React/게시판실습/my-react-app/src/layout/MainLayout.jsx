import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    // 비유: 전체 도화지에 연한 회색 배경(f8f9fa)을 칠해 깔끔하게 만들어요.
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Header />{" "}
      {/* 1. 준비물: 모든 페이지 상단에 똑같이 보일 '고정 메뉴바'입니다. */}
      {/* 설계 의도: 내용이 너무 양옆으로 퍼지지 않게 '가운데 정렬(margin: auto)' 시킵니다. */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <Outlet />{" "}
        {/* 2. 일 시키기: 주소에 따라 실제 페이지(글 목록 등)를 이 자리에 갈아 끼워줍니다. */}
      </main>
    </div>
  );
};

export default MainLayout;
