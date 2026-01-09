import { API_KEY, BASE_URL, IMG_URL, resultsDiv } from './config.js';

//Film delen
// export async function getTopRated() {
//   const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=sv-SE&page=1`);
//   const data = await res.json();
//   showMovies(data.results.slice(0, 10), false);
// }

export async function getTopRated() {
  const errorDiv = document.getElementById('error-message'); 
  errorDiv.classList.remove('error-visible');
  errorDiv.textContent = ''; 
  try {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=sv-SE&page=1`);
    
    if(!res.ok) throw 'Something went wrong when fetching the data!'
    else{
      const data = await res.json();
      showMovies(data.results.slice(0, 10), false);
    }
  }
  catch (error) {
    console.error(error); 
    errorDiv.textContent = error;   
    errorDiv.classList.add('error-visible');
    setTimeout(() => {
      errorDiv.classList.remove('error-visible');
    }, 5000);
  }

}

export async function getPopular() {
  const errorDiv = document.getElementById('error-message'); 
  errorDiv.classList.remove('error-visible');
  errorDiv.textContent = ''; 
  try{
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=sv-SE&page=1`);

  if(!res.ok) throw 'Something went wrong when fetching the data!'
  else{
  const data = await res.json();
  showMovies(data.results.slice(0, 10), false);
  }
}
catch (error){
  console.log(error)
  errorDiv.textContent = error;   
  errorDiv.classList.add('error-visible');
  setTimeout(() => {
     errorDiv.classList.remove('error-visible');
  }, 5000);
}

}

export async function searchMovie(query) {
  const errorDiv = document.getElementById('error-message'); 
  errorDiv.classList.remove('error-visible');
  errorDiv.textContent = ''; 
  try{
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=sv-SE`);

  if(!res.ok) throw 'Something went wrong when fetching the data!'
  else{
  const data = await res.json();
  showMovies(data.results, true);
  }
}
catch (error){
  console.log(error)
  errorDiv.textContent = error;   
  errorDiv.classList.add('error-visible');
  setTimeout(() => {
    errorDiv.classList.remove('error-visible');
  }, 5000);
}
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
