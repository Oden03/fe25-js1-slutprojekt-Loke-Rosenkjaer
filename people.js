import { API_KEY, BASE_URL, IMG_URL, resultsDiv } from './config.js';

//Allt om personerna
export function translateDepartment(department) {
  const translations = {
    Acting: "Acting",
    Directing: "Editing",
    Writing: "Script",
    Production: "Producer"
  };
  return translations[department] || department;
}

export async function searchPerson(query) {
  const errorDiv = document.getElementById('error-message'); 
  errorDiv.classList.remove('error-visible');
  errorDiv.textContent = ''; 
  try{
  const res = await fetch(`${BASE_URL}/search/person?api_key=${API_KEY}&query=${query}&language=sv-SE`);

  if(!res.ok) throw 'Something went wrong when fetching the data!'
  else{
  const data = await res.json();
  showPeople(data.results);
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
export function showPeople(people) {
  resultsDiv.innerHTML = "";

  if (people.length === 0) {
    resultsDiv.innerHTML = "<p>No people found. Check your spelling and try again.</p>";
    return;
  }

  people.forEach(person => {
    const knownForList = person.known_for
      .slice(0, 3)
      .map(item => {
        const type = item.media_type === "movie" ? "Movie" : "Tv";
        const title = item.title || item.name;
        return `<li>${type}: ${title}</li>`;
      })
      .join("");

    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${person.name}</h3>
      ${person.profile_path ? `<img src="${IMG_URL + person.profile_path}">` : ""}
      <p><strong>Known for:</strong> ${translateDepartment(person.known_for_department)}</p>
      <ul>${knownForList}</ul>
    `;
    resultsDiv.appendChild(div);
  });
}
