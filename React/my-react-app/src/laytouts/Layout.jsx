// src/layouts/Layout.jsx
import { Outlet, Link, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          <NavLink className="button" to="/">
            홈
          </NavLink>
          <NavLink to="/about" className="button">
            소개
          </NavLink>
          <NavLink to="/contact" className="button">
            연락처
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
