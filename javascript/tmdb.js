import axios from "axios";

const getmovies = async () => {
  try {
    const url = "https://api.themoviedb.org/3/movie/now_playing";

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

    const data = response.data.results;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const movies = await getmovies();

console.log(movies);

const movieNames = movies.map((movie) => movie.title);

console.log(movieNames);
