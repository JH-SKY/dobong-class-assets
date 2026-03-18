// src/layouts/Layout.jsx
import { Outlet, Link, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          {/* 오류 강제 발생 */}
          {/* {undefined.attribute} */}
          <NavLink className="button" to="/">
            홈
          </NavLink>
          <NavLink to="/about" className="button">
            소개
          </NavLink>
          <NavLink to="/contact" className="button">
            연락처
          </NavLink>
          <NavLink to="/settings" className="button">
            세팅
          </NavLink>
          <NavLink to="/mypage" className="button">
            마이페이지
          </NavLink>
          <NavLink to="/layout-prob/home" className="button">
            /layout-prob
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2099 My Website</p>
      </footer>
    </div>
  );
};

export default Layout;
