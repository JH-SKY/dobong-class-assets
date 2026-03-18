import React from "react";
import useThemeStore from "../../store/useThemeStore";

const ThemeToggle = () => {
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button className="button" onClick={toggleTheme}>
      다크모드 {isDark ? "OFF" : "ON"}
    </button>
  );
};

export default ThemeToggle;
