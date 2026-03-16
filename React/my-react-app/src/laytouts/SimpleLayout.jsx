// src/layouts/Layout.jsx
import { Outlet, NavLink } from "react-router-dom";

const LayoutProb = () => {
  return (
    <div>
      <header>
          <h1>🛒 MyShop</h1>

      </header>

      <main>
        <Outlet />
      </main>

    </div>
  );
};

export default LayoutProb;
