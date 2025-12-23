import { animateTitle } from './animation.js';
import { getTopRated, getPopular, searchMovie } from './movies.js';
import { searchPerson } from './people.js';

//Knapparna
document.getElementById("topRatedBtn").addEventListener("click", getTopRated);
document.getElementById("popularBtn").addEventListener("click", getPopular);

document.getElementById("searchMovieBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;
  searchMovie(query);
});

document.getElementById("searchPersonBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;
  searchPerson(query);
});

document.getElementById("searchInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const query = document.getElementById("searchInput").value;
    searchMovie(query);
  }
});

// Kontrollerar internetanslutningen
if (!navigator.onLine) {
  alert("You are offline! Check your internet and try again.");
}

window.addEventListener('offline', function() {
  alert("Internet connection has been lost!");
});

document.addEventListener('DOMContentLoaded', () => {
  animateTitle();  
});