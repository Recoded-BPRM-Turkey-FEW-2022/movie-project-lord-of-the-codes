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
  console.log("moviesRes",movieRes)
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

const fetchPeople= async()=> {
  const url = constructUrl(`person/popular`)
  const response = await fetch(url)
  const data = await response.json()
  return data.results;
}

const fetchGenre= async (genreId)=>{
  const url = constructUrl(`genre/movie/list`)
  const res = await fetch(url)
  return res.json();
}

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  console.log("movies",movies)
  const CONTAINER = document.querySelector(".container-fluid");
  const divMovies=document.createElement("div");
  const MoviesHeader=document.createElement("h1");
  CONTAINER.setAttribute("style", "background-color: white;");
  MoviesHeader.innerHTML="Movies"
  CONTAINER.appendChild(MoviesHeader)
  divMovies.classList.add("d-flex",
  "flex-row",
  "flex-wrap","justify-content-around"
  );

  movies.map((movie) => {
    const CardDiv = document.createElement("div");
    const movieImage = document.createElement("img");
    const movieTitle = document.createElement("h3");
    CardDiv.classList.add("card");
    movieImage.classList.add("card-img-top");
    movieTitle.classList.add("card-title");
    CardDiv.innerHTML = `
        <img class="image" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title
} poster">
        <h4 class="contentCard" >${movie.title}</h4>`;
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
  const firstsection=document.querySelector(".FirstSection");
  firstsection.setAttribute("style", "background-image: url(" +BACKDROP_BASE_URL + movie.backdrop_path+ ");background-size: cover;");
  CONTAINER.setAttribute("style", "background-color: white;");
  CONTAINER.innerHTML = `
  <div class="movDetail">
    <div class="row">
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
            <ul id="actors" class="list-unstyled">${movie.actors}</ul>
    </div>`;
};
let aboutUsNav = document.getElementById('about-us');
//adding  event listner to actors in navbar
aboutUsNav.addEventListener("click", async function () {
  AboutUsPage.renderAboutUs()
});
/////// About Us page rendering
class AboutUsPage {
  static container = document.querySelector(".FirstSection");//dikkat et buraya, sadece bu sayfayı etkileyecek css lazım
  static renderAboutUs() {
    AboutUsPage.container.innerHTML = "";
    const AboutUsDiv = document.createElement("div");
    AboutUsDiv.classList.add("cardAct");
    //AboutUsDiv.classList.add("mb-3");
    this.container.appendChild(AboutUsDiv)

    const abousUsImg = document.createElement("img");
    abousUsImg.classList.add("aboutUsImage");
    abousUsImg.src = "1.webp";//image ayarla
    AboutUsDiv.appendChild(abousUsImg)

    const AboutUsDivBody = document.createElement("div");
    AboutUsDivBody.classList.add("card-body");
    AboutUsDiv.appendChild(AboutUsDivBody)

    const AboutUsDivTitle = document.createElement("h5");
    AboutUsDivTitle.classList.add("aboutUs");
    AboutUsDivTitle.textContent = "Let's talk about Movie Hub";
    AboutUsDivBody.appendChild(AboutUsDivTitle)


    const AboutUsDivTxt = document.createElement("p");
    AboutUsDivTxt.classList.add("aboutUs");
    AboutUsDivTxt.innerHTML = "<br><br><br> <br>The Movie Hub is a website built out of TMDb database. Our main goal is to bring you all the Movie information you need. New movies, Popular movies or Old movies; you'll find it all here.";
    AboutUsDivBody.appendChild(AboutUsDivTxt)

    const AboutUsDivNote = document.createElement("h4");
    AboutUsDivNote.classList.add("aboutUs");
    AboutUsDivNote.innerHTML = "<br><br><br><br><br> Enjoy browsing Movie Hub";
    AboutUsDivTxt.appendChild(AboutUsDivNote)
  }
}

const fetchPopularMovies= async()=> {
  const url = constructUrl(`movie/popular`)
  const response = await fetch(url)
  const data = await response.json()
  return data.results;
}

const renderPopularMovies = (movies) => {
  const CONTAINER = document.querySelector(".container-fluid");
  const divMovies=document.createElement("div");
  const MoviesHeader=document.createElement("h1");
  MoviesHeader.innerHTML="Popular Movies"
  CONTAINER.appendChild(MoviesHeader)
  divMovies.classList.add("d-flex",
  "flex-row",
  "flex-wrap","justify-content-around"
  );
  movies.map((movie) => {
    const CardDiv = document.createElement("div");
    const movieImage = document.createElement("img");
    const movieTitle = document.createElement("h3");
    CardDiv.classList.add("card");
    movieImage.classList.add("card-img-top");
    movieTitle.classList.add("card-title");
    CardDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
        <h3>${movie.title}</h3>`;
    CardDiv.addEventListener("click", () => {
      movieDetails(movie);
    });

    CardDiv.appendChild(movieImage);
    CardDiv.appendChild(movieTitle);
    divMovies.appendChild(CardDiv)
    CONTAINER.appendChild(divMovies);
  });

};
let popularNav = document.getElementById('popular');
popularNav.addEventListener("click", async function () {
  const popular = await fetchPopularMovies();
  const CONTAINER = document.querySelector(".container-fluid");
  CONTAINER.innerHTML = "";
  renderPopularMovies(popular);
});

const fetchReleasedate= async()=> {
  const url = `${TMDB_BASE_URL}/discover/movie?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}&sort_by=release_date.desc`
  const response = await fetch(url)
  const data = await response.json()
  return data.results;
}

let releasedate = document.getElementById('release-date');
releasedate.addEventListener("click", async function () {
  const releaseDateRender = await fetchReleasedate();
  const CONTAINER = document.querySelector(".container-fluid");
  CONTAINER.innerHTML = "";
  renderReleasedate(releaseDateRender);
});

const renderReleasedate = (movies) => {
  const CONTAINER = document.querySelector(".container-fluid");
  const divMovies=document.createElement("div");
  const MoviesHeader=document.createElement("h1");
  MoviesHeader.innerHTML="Released Date"
  CONTAINER.appendChild(MoviesHeader)
  divMovies.classList.add("d-flex",
  "flex-row",
  "flex-wrap","justify-content-around"
  );
  movies.map((movie) => {
    const CardDiv = document.createElement("div");
    const movieImage = document.createElement("img");
    const movieTitle = document.createElement("h3");
    CardDiv.classList.add("card");
    movieImage.classList.add("card-img-top");
    movieTitle.classList.add("card-title");
    CardDiv.innerHTML = `
        <h3>${movie.title}</h3>`;
    CardDiv.addEventListener("click", () => {
      movieDetails(movie);
    });

    CardDiv.appendChild(movieImage);
    CardDiv.appendChild(movieTitle);
    divMovies.appendChild(CardDiv)
    CONTAINER.appendChild(divMovies);
  });

};
//////////////////////////////////////
const fetchTopRated= async()=> {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=542003918769df50083a13c415bbc602&language=en-US&page=1`
  const response = await fetch(url)
  console.log(url)
  const data = await response.json()
  return data.results;
}

let TopRated = document.getElementById('top-rated');
TopRated.addEventListener("click", async function () {
  const releaseDateRender = await fetchTopRated();
  const CONTAINER = document.querySelector(".container-fluid");
  CONTAINER.innerHTML = "";
  renderTopRated(releaseDateRender);
});

const renderTopRated = (movies) => {
  const CONTAINER = document.querySelector(".container-fluid");
  const divMovies=document.createElement("div");
  const MoviesHeader=document.createElement("h1");
  MoviesHeader.innerHTML="Top Rated"
  CONTAINER.appendChild(MoviesHeader)
  divMovies.classList.add("d-flex",
  "flex-row",
  "flex-wrap","justify-content-around"
  );
  movies.map((movie) => {
    const CardDiv = document.createElement("div");
    const movieImage = document.createElement("img");
    const movieTitle = document.createElement("h3");
    CardDiv.classList.add("card");
    movieImage.classList.add("card-img-top");
    movieTitle.classList.add("card-title");
    CardDiv.innerHTML = `
    <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
        <h3>${movie.title}</h3>`;
    CardDiv.addEventListener("click", () => {
      movieDetails(movie);
    });

    CardDiv.appendChild(movieImage);
    CardDiv.appendChild(movieTitle);
    divMovies.appendChild(CardDiv)
    CONTAINER.appendChild(divMovies);
  });

};
////////////////////////////////

const fetchActor = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);
  const data = await res.json()
  return data.results;
};
console.log(fetchActor())



let Actors = document.getElementById('Actor');
Actors.addEventListener("click", async function () {
  const ActorRender = await fetchActor();
  const CONTAINER = document.querySelector(".container-fluid");
  CONTAINER.innerHTML = "";
  renderActor(ActorRender);
});

const renderActor = (movies) => {
  const CONTAINER = document.querySelector(".container-fluid");
  console.log("jkqdw",movies)
  const divMovies=document.createElement("div");
  const MoviesHeader=document.createElement("h1");
  MoviesHeader.innerHTML="Actors"
  CONTAINER.appendChild(MoviesHeader)
  divMovies.classList.add("d-flex",
  "flex-row",
  "flex-wrap","justify-content-around"
  );
  movies.map((movie) => {
    const CardDiv = document.createElement("div");
    const movieImage = document.createElement("img");
    const movieTitle = document.createElement("h3");
    CardDiv.classList.add("cardAct");
    movieImage.classList.add("card-img-top");
    movieTitle.classList.add("card-title");
    CardDiv.innerHTML = `
    <img class= "cardAct" src="${PROFILE_BASE_URL+movie.profile_path}" alt="${
      movie.name
    } poster">
        <h3>${movie.name}</h3>`;
    CardDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CardDiv.appendChild(movieImage);
    CardDiv.appendChild(movieTitle);
    divMovies.appendChild(CardDiv)
    CONTAINER.appendChild(divMovies);
  });

};
/*static _ReleaseDataConstructUrl() {
  return `${this.TMDB_BASE_URL}/discover/movie?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}&sort_by=release_date.desc`;
}*/

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

if (resDat.media_type === movie){
    searchContent.innerHTML = "";
    resDat.results.forEach(element => {
      const elementContainer = document.createElement("div")
      elementContainer.innerHTML=`
      <h3 class="red-text">${element.title}</h3>
<img width="300" class="image" src="${IMG_PATH + element.backdrop_path}">
`
//elementContainer.classList.add('className')
  searchContent.appendChild(elementContainer)
})
  }else if(resDat.media_type === person){
    searchContent.innerHTML="";
    resDat.results.forEach(popi => {
      const elementContainer = document.createElement("div")
      elementContainer.innerHTML= `
      <h3 class="red-text">${popi.name}</h3>
      <img width ="300" class="image" src="${PROFILE_BASE_URL + popi.profile_path}">
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


document.addEventListener("DOMContentLoaded", autorun);

