import { create } from "zustand";

const useCartStore = create((set) => ({
  // 상태 (데이터)
  items: [],

  // 액션 (상태를 변경하는 함수)
  addItem: (product) =>
    set((state) => {
      // 모든 items들을 돌면서 product와 같은 id가 있는지 여부를 확인
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        // product와 같은 것이 존재하면, 걔는 수량 1 늘리고
        // 나머지 item들은 그대로 넣는다.
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      // product와 같은 것이 없으면 걔를 items에 넣는다.
      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    })),
  clearItems: () => {
    set({ items: [] });
  },
}));

export default useCartStore;
