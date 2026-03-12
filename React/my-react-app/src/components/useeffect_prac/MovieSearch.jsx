import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieLIstItem from "./MovieLIstItem"; // 1. 준비물: 아까 만든 붕어빵 틀(아이템 컴포넌트)을 가져옵니다.

const MovieSearch = () => {
  // 2. [상태 관리] 데이터 그릇 준비
  // query는 '검색창에 입력한 글자', movies는 '서버에서 받아온 영화 꾸러미'예요.
  const [query, setQuery] = useState("batman"); 
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 환경 변수에 저장한 내 '출입증(API_KEY)'을 가져옵니다.
  const API_KEY = import.meta.env.VITE_API_KEY;

  // 3. [로직] 서버에 데이터를 요청하는 '배달원' 함수
  const fetchMovies = async () => {
    if (!query) return; // 검색어가 비어있으면 배달 가지 않아요.

    try {
      setIsLoading(true); // "배달 시작합니다!" 전광판 켜기
      
      // TMDB 도서관의 'search/movie' 코너로 가서 query라는 제목을 가진 책을 찾습니다.
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      
      // 서버가 준 데이터 중 'results'라는 실제 알맹이만 영화 바구니에 담습니다.
      setMovies(response.data.results);
    } catch (error) {
      console.error("영화 검색 중 사고 발생:", error.message);
    } finally {
      setIsLoading(false); // "배달 완료!" 전광판 끄기
    }
  };

  // 4. [설계 의도] 처음 페이지가 열리자마자 'batman'을 보여주기 위한 비서
  useEffect(() => {
    fetchMovies(); 
  }, []); // []는 "처음 태어날 때 딱 한 번만 해줘"라는 뜻이에요.

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🔍 영화 검색</h1>

      {/* 5. [입력부] 사용자의 주문을 받는 곳 */}
      <div className="mb-8 flex gap-2">
        <input
          type="text"
          className="border p-2 rounded-lg w-80"
          placeholder="영화 제목을 입력하세요"
          value={query} // 그릇(state)과 입력창을 연결합니다.
          onChange={(e) => setQuery(e.target.value)} // 글자를 칠 때마다 그릇에 담아요.
          onKeyDown={(e) => e.key === "Enter" && fetchMovies()} // 엔터 쳐도 검색되게 하는 실무 팁!
        />
        <button 
          onClick={fetchMovies} // 버튼을 누르면 배달원(fetchMovies)을 호출합니다.
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          검색
        </button>
      </div>

      {/* 6. [출력부] 결과를 화면에 뿌려주는 곳 */}
      {isLoading ? (
        <p>요청하신 영화를 찾고 있어요...</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {movies.length > 0 ? (
            movies.map((movie) => (
              // 아까 만든 '틀(MovieLIstItem)'에 영화 데이터를 하나씩 배달합니다.
              // 고유 이름표(key) 다는 것 잊지 마세요!
              <MovieLIstItem key={movie.id} movie={movie} />
            ))
          ) : (
            <p>검색 결과가 없습니다. 😅</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;