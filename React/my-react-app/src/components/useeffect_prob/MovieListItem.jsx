import React from "react";

const MovieListItem = ({ movie }) => {
  return (
    <div className="w-56 border p-2 rounded-xl shadow-lg">
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
        className="rounded-lg"
      />
      <div className="mt-2 font-bold text-lg truncate">{movie.title}</div>
      <div className="text-yellow-500 font-semibold">⭐ {movie.vote_average}</div>
    </div>
  );
};

export default MovieListItem;