import React from "react";

const MovieListItem = ({ movie }) => {
  // 1. [개별 상품] 넘겨받은 영화 한 개의 제목, 평점, 이미지를 예쁘게 그려요.
  return (
    <div className="w-60 p-4 m-4 border rounded-2xl shadow-lg">
      {/* 2. [포스터 주소] TMDB 전용 주소에 영화마다 다른 poster_path를 합쳐서 이미지를 띄워요. */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-xl"
      />
      <div className="mt-4 font-bold text-lg">{movie.title}</div>
      <div className="text-yellow-500 font-bold">⭐ {movie.vote_average}</div>
    </div>
  );
};

export default MovieListItem;