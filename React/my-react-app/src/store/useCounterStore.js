// src/store/useCounterStore.js
import { create } from "zustand";

const useCounterStore = create((set) => ({
  // 상태 (데이터)
  count: 0,

  // 액션 (상태를 변경하는 함수)
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useCounterStore;
