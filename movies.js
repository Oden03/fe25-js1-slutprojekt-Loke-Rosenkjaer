import { API_KEY, BASE_URL, IMG_URL, resultsDiv } from './config.js';

//Film delen
export async function getTopRated() {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=sv-SE&page=1`);
  const data = await res.json();
  showMovies(data.results.slice(0, 10), false);
}

export async function getPopular() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=sv-SE&page=1`);
  const data = await res.json();
  showMovies(data.results.slice(0, 10), false);
}

export async function searchMovie(query) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=sv-SE`);
  const data = await res.json();
  showMovies(data.results, true);
}

export function showMovies(movies, showDescription = true) {
  resultsDiv.innerHTML = "";

  if (movies.length === 0) {
    resultsDiv.innerHTML = "<p>No movies found. Check your spelling and try again.</p>";
    return;
  }

  movies.forEach(movie => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${movie.title}</h3>
      ${movie.poster_path ? `<img src="${IMG_URL + movie.poster_path}">` : ""}
      <p><strong>Release:</strong> ${movie.release_date || "Unknown date"}</p>
      ${showDescription && movie.overview ? `<p>${movie.overview.substring(0, 150)}...</p>` : ""}
    `;
    resultsDiv.appendChild(div);
  });
}
