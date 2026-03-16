// src/layouts/Layout.jsx
import { Outlet, NavLink } from "react-router-dom";

const LayoutProb = () => {
  return (
    <div>
      <header>
        <nav>
          <h1>🛒 MyShop</h1>
          <NavLink to="/">홈</NavLink>
          <NavLink to="/product">상품</NavLink>
          <NavLink to="/cart">장바구니</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>고객센터 : 1234-5678</p>
      </footer>
    </div>
  );
};

export default LayoutProb;
