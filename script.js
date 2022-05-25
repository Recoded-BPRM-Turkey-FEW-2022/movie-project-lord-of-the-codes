'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container-fluid");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};
// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};


// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  const CONTAINER = document.querySelector(".container-fluid");
  const divMovies=document.createElement("div");
  const MoviesHeader=document.createElement("h1");
  MoviesHeader.innerHTML="Movies"
  CONTAINER.appendChild(MoviesHeader)
  divMovies.classList.add("d-flex",
  "flex-row",
  "flex-wrap","justify-content-around"
  );
console.log(divMovies)

/////////////
  movies.map((movie) => {
    const CardDiv = document.createElement("div");
    const movieImage = document.createElement("img");
    const movieTitle = document.createElement("h3");
    CardDiv.classList.add("card");
    movieImage.classList.add("card-img-top");
    movieTitle.classList.add("card-title");
    CardDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title
} poster">
        <h4>${movie.title}</h4>`;
    CardDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CardDiv.appendChild(movieImage);
    CardDiv.appendChild(movieTitle);
    divMovies.appendChild(CardDiv);
    CONTAINER.appendChild(divMovies);
  });
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `
  <div class="movDetail">
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>

          <ul id="actors" class="list-unstyled"></ul>
    </div>
  </div>`;
};

document.addEventListener("DOMContentLoaded", autorun);


const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=23381f9d606c6cff00c6543b3446c4ad&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=23381f9d606c6cff00c6543b3446c4ad&query=" '
const main = document.getElementById("content");
const search = document.getElementById("search");


const searchconstructUrl = (searchValue) => {
  return `${TMDB_BASE_URL}/search/multi?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}&query=${searchValue}`;
};

const searchRes = async (searchValue) => {
  const url = searchconstructUrl(searchValue);
  const res = await fetch(url);
  const json = await res.json();
  return json;
}


const renderSearch = async (data) => {
  const resDat = await searchRes(data)
  const searchContent = document.getElementById("content");

    if (resDat === undefined) {
    alert("undefined")
  } else if (resDat === movie){
    searchContent.innerHTML = "";
    resDat.results.forEach(element => {
      const elementContainer = document.createElement("div")
      elementContainer.innerHTML=`
      <h3 class="red-text">${element.title}</h3>
<img width="300" src="${IMG_PATH + element.backdrop_path}">
`
elementContainer.classList.add('className')
  searchContent.appendChild(elementContainer)
})
  }else if(resDat === person){
    searchContent.innerHTML="";
    resDat.results.forEach(popi => {
      const elementContainer = document.createElement("div")
      elementContainer.innerHTML= `
      <h3 class="red-text">${popi.name}</h3>
      <img width ="300" src="${PROFILE_BASE_URL + popi.profile_path}">
      `
      searchContent.appendChild(elementContainer)
    })
  }
}


const form = document.getElementById("searchBtn");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const results = await searchRes();
  const searchIn = document.querySelector("#search");
  searchIn.innerHTML = "";
  renderSearch(results);
});
