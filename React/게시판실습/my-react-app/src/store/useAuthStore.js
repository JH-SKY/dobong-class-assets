// 1. 준비물 챙기기: 'Zustand' 금고 틀과 'api' 배달원을 가져와요.
import { create } from "zustand";
import api from "../api";

const useAuthStore = create((set) => ({
  // [상태] 2. 비유: 유저 정보와 토큰은 '바늘과 실'처럼 항상 붙어 다녀요.
  user: null, // 유저의 이름, 이메일 등 상세 정보
  token: localStorage.getItem("token"), // 브라우저 창고에 저장된 출입증
  isLoggedIn: !!localStorage.getItem("token"), // 토큰이 있으면 로그인된 걸로 간주!

  // [동작: 로그인] 설계 의도: 로그인 성공 시 토큰 저장과 유저 정보 조회를 '한 번에' 처리합니다.
  login: async (email, password) => {
    // 1단계: 로그인해서 토큰 받기
    const res = await api.post("/auth/login", { email, password });
    const token = res.data.access_token;
    localStorage.setItem("token", token); // 창고에 보관

    // 2단계: 받은 토큰으로 "나 누군지 알려줘" 하고 정보 가져오기
    const userRes = await api.get("/auth/me");
    set({ token, user: userRes.data, isLoggedIn: true });
    return true;
  },

  // [동작: 로그아웃] 비유: 퇴근할 때 사물함(localStorage)을 비우고 금고를 초기화해요.
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null, isLoggedIn: false });
  },

  // [동작: 체크] 설계 의도: 새로고침했을 때 창고에 토큰이 남아있다면 유저 정보를 다시 복구해요.
  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await api.get("/auth/me");
      set({ token, user: res.data, isLoggedIn: true });
    } catch (err) {
      // 만약 토큰이 가짜거나 만료되었다면 싹 다 지우기
      localStorage.removeItem("token");
      set({ token: null, user: null, isLoggedIn: false });
    }
  },
}));

export default useAuthStore;
