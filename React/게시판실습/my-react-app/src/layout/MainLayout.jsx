import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Header /> {/* 2. 상단에 고정! (페이지가 바뀌어도 안 변함) */}
      <main>
        <Outlet /> {/* 3. 주소에 따라 실제 페이지(내용)가 나오는 자리 */}
      </main>
    </div>
  );
};

export default MainLayout;