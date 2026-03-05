const button = document.querySelector("#load-btn");
const movieList = document.querySelector("#movie-list");
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWI4Yzk4OTNlNzI1YjJlMTY3MTg3Y2VmNjZiYWUzZCIsIm5iZiI6MTYyNzYwODIyMC4xMzUsInN1YiI6IjYxMDM1NDljNGU1MmVkMDA3NTg3ZDhjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7oh38inWROms2MMFyhEFbbTs8qt3a1tOu_9m-56aQn8";

async function loadMovies() {
  // axios 요청을 통해서 json 데이터를 가져올 겁니다.
  try {
    const config = {
      params: {
        language: "ko-kr",
      },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    const url = `${BASE_URL}/movie/now_playing`;
    const response = await axios.get(url, config);

    const movies = response.data.results;
    console.log(movies);

    //   const sorted_movies = movies
    //     .sort((a, b) => b.vote_average - a.vote_average)
    //     .filter((movie) => movie.vote_average > 7);

    // 기존 내용 비우기
    movieList.innerHTML = "";

    for (let movie of movies) {
      // 카드 div 생성
      const card = document.createElement("div");
      card.className = "movie-card";

      // 포스터 이미지
      const img = document.createElement("img");
      img.src = `${IMAGE_URL}${movie.poster_path}`;
      img.alt = movie.title;

      // 제목
      const title = document.createElement("h3");
      title.textContent = movie.title;

      // 평점
      const rating = document.createElement("p");
      rating.textContent = `평점: ${movie.vote_average}`;

      // 카드에 요소들 추가
      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(rating);

      // 화면에 추가
      movieList.appendChild(card);
    }
  } catch (error) {
    console.log("에러 발생:", error.message);
    movieList.innerHTML = "<p>영화를 불러오는 데 실패했습니다.</p>";
  }
}

button.addEventListener("click", loadMovies);
// loadMovies();
