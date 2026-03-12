import React from "react";
import MovieListItem from "./MovieListItem";

const MovieList = ({ movies }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {movies.map((movie) => (
        // 영화 하나하나를 그리라고 아이템 컴포넌트에게 시킵니다.
        <MovieListItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;