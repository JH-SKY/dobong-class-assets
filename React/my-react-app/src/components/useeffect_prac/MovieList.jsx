import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import MovieLIstItem from "./MovieLIstItem";

const MovieList = () => {
  // 1. 영화 데이터를 가져온다
  //      언제 가져올래? - 클릭 / 스크롤 / 화면에 들어가자마자 등등등
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = "https://api.themoviedb.org/3/movie/popular";
        const config = {
          params: {
            language: "ko-kr",
          },
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWI4Yzk4OTNlNzI1YjJlMTY3MTg3Y2VmNjZiYWUzZCIsIm5iZiI6MTYyNzYwODIyMC4xMzUsInN1YiI6IjYxMDM1NDljNGU1MmVkMDA3NTg3ZDhjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7oh38inWROms2MMFyhEFbbTs8qt3a1tOu_9m-56aQn8",
          },
        };

        const response = await axios.get(url, config);

        console.log(response.data.results);

        const movies = response.data.results;

        const sortedMovies = movies.sort(
          (a, b) => b.vote_average - a.vote_average,
        );
        setMovies(sortedMovies);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // 2. 그걸 보여준다.

  if (isLoading) {
    return <div>영화 가져오는중,,,,</div>;
  }

  if (error) {
    return <h1 className="text-red-400">에러발생!</h1>;
  }

  return (
    <>
      <div>MovieList</div>
      <div className="flex flex-wrap">
        {movies.map((movie) => {
          return <MovieLIstItem movie={movie} />;
        })}
      </div>
    </>
  );
};

export default MovieList;
