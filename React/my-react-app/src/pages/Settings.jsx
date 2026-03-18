// src/pages/Settings.jsx
import { Outlet, NavLink } from "react-router-dom";

const Settings = () => {
  return (
    <div className="card flex gap-8">
      <nav className="flex flex-col gap-2">
        <NavLink to="/settings/profile">프로필 설정</NavLink>
        <NavLink to="/settings/account">계정 설정</NavLink>
      </nav>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
