import React from "react";
import MovieLIstItem from "./MovieLIstItem";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const url = "https://api.themoviedb.org/3/search/movie";
      const config = {
        params: {
          language: "ko-kr",
          query: query,
        },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWI4Yzk4OTNlNzI1YjJlMTY3MTg3Y2VmNjZiYWUzZCIsIm5iZiI6MTYyNzYwODIyMC4xMzUsInN1YiI6IjYxMDM1NDljNGU1MmVkMDA3NTg3ZDhjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7oh38inWROms2MMFyhEFbbTs8qt3a1tOu_9m-56aQn8",
        },
      };

      const response = await axios.get(url, config);

      console.log(response.data.results);

      const movies = response.data.results;

      setMovies(movies);
    };
    fetchMovies();
  }, [query]);

  // 1. 의존성 배열을 사용하지 않고, 버튼을 클릭하면 요청을 보내도록 한다. -> input값을 가져오는 로직이 필요합니다.

  // 2. 의존성 배열은 유지한 상태로, input에 대한 state와 query에 대한 state를 분리한다.

  // 3. useRef라는 녀석이 있어요. 그걸 통해서 input에 있는 값을 그때그때 가져오는게 좋을수도 있습니다.

  // 지금은 버튼을 클릭해야하는데, enter로 검색하고 싶으면 form으로 감싸서 preventDefault해서 사용하면 됩니다.
  return (
    <>
      <h1>Search Movie</h1>

      <input
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="input"
      />
      <button
        onClick={() => {
          setQuery(input);
        }}
      >
        검색
      </button>
      <div className="flex flex-wrap">
        {movies.map((movie) => {
          return <MovieLIstItem movie={movie} />;
        })}
      </div>
    </>
  );
};

export default MovieSearch;
