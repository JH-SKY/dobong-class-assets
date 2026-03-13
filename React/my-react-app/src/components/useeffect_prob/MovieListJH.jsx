import React from "react";
import MovieListItem from "./MovieListItemJH";

const MovieList = ({ movies }) => {
  // 1. [진열대] 부모가 준 movies 배열을 map으로 하나씩 꺼내서 보여줘요.
  return (
    <div className="flex flex-wrap justify-center">
      {movies.map((movie) => {
        // 2. [개별 포장] 꺼낸 영화 하나(movie)를 '아이템' 컴포넌트에게 다시 넘겨줍니다.
        return <MovieListItem key={movie.id} movie={movie} />;
      })}
    </div>
  );
};

export default MovieList;