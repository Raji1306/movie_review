const KEY = "api_key=8ff0c9574c86086fa9f5265668d8770b";
const url = "https://api.themoviedb.org/3/";
const api_url =
  url + "/discover/movie?&original_language='e'&sort_by=popularity.desc&" + KEY;
const img_url = "https://image.tmdb.org/t/p/w500/";
const s_url = url + "/search/movie?" + KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

function get(u) {
  fetch(u)
    .then((res) => res.json())
    .then((data) => {
      show(data.results);
    });
}
get(api_url);

function show(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieE = document.createElement("div");
    movieE.classList.add("movie");
    movieE.innerHTML = ` <img src="${img_url + poster_path}" alt="image" />
      <div class="movieInfo">
        <h3>${title}</h3>
        <span class="${color(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
      `;
    main.appendChild(movieE);
  });
}

function color(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const sterm = search.value;
  if (sterm) {
    get(s_url + "&query=" + sterm);
  } else {
    get(api_url);
  }
});
