import React from "react";
import useThemeStore from "../../store/useThemeStore";

const ThemePage = () => {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div
      className={`
    w-100 h-full
    ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}
    `}
    >
      <div>ThemePage</div>
      <div>적당한 글씨들이 들어있을꺼구요.</div>
    </div>
  );
};

export default ThemePage;
