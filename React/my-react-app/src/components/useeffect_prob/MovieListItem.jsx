import React from "react";

const MovieLIstItem = ({ movie }) => {
  return (
    <div className="w-60 p-4 m-4 border rounded-2xl">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
      <div>{movie.title}</div>
      <div>평점 : {movie.vote_average}</div>
    </div>
  );
};

export default MovieLIstItem;
