import axios from "axios";

// 1. 준비물 챙기기: 'api'라는 이름의 전용 배달 오토바이를 한 대 맞춥니다.
const api = axios.create({
  // 비유: 모든 배달의 기본 목적지(백엔드 서버 주소)를 미리 입력해둡니다.
  baseURL: "http://localhost:8000",
});

// 2. 설계 의도: 배달원이 출발하기 직전에 '검문소(Interceptor)'를 거치게 합니다.
api.interceptors.request.use((config) => {
  // 비유: 우리 집 금고(localStorage)에서 '출입증(token)'을 꺼냅니다.
  const token = localStorage.getItem("token");

  // 3. 일 시키기: 출입증이 있다면 배달원 가슴에 '통행증(Authorization)'을 딱 붙여서 보냅니다.
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // 이제 준비 완료! 서버로 출발합니다.
  return config;
});

export default api;