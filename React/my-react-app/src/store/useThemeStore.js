import { create } from "zustand";

const useThemeStore = create((set) => ({
  // 상태 (데이터)
  isDark: false,

  // 액션 (상태를 변경하는 함수)
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));

export default useThemeStore;
