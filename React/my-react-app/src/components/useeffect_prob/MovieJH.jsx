import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieSearch from "./MovieSearchJH";
import MovieList from "./MovieListJH";

const Movie = () => {
  const [movies, setMovies] = useState([]); // 영화 데이터 바구니
  const API_KEY = import.meta.env.VITE_API_KEY;

  // 1. [설계 의도] 서버에 데이터 가져오라고 시키는 공통 함수입니다.
  const getMoviesFromServer = async (searchQuery = "") => {
    // 검색어가 있으면 검색 주소, 없으면 인기 목록 주소로 갑니다.
    const url = searchQuery
      ? `https://api.themoviedb.org/3/search/movie`
      : `https://api.themoviedb.org/3/movie/popular`;

    const response = await axios.get(url, {
      params: { api_key: API_KEY, query: searchQuery, language: "ko-KR" },
    });
    setMovies(response.data.results);
  };

  // 2. 처음 켰을 때 기본으로 인기 영화를 가져옵니다.
  useEffect(() => {
    getMoviesFromServer();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-10">🎬 MOVIE WORLD</h1>

      {/* 3. 자식 1: 검색창 (데이터를 가져오는 함수를 배달해줍니다) */}
      <MovieSearch onSearch={getMoviesFromServer} />

      {/* 4. 자식 2: 목록 (가져온 movies 데이터를 배달해줍니다) */}
      <MovieList movies={movies} />
    </div>
  );
};

export default Movie;
