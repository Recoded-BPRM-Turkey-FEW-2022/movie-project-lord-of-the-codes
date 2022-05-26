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
  static container = document.querySelector(".FirstSection");
  static renderAboutUs() {
    AboutUsPage.container.innerHTML = "";
    const AboutUsDiv = document.createElement("div");
    AboutUsDiv.classList.add("card");
    AboutUsDiv.classList.add("mb-3");
    this.container.appendChild(AboutUsDiv)

    const abousUsImg = document.createElement("img");
    abousUsImg.classList.add("card-img-top");
    abousUsImg.src = "1.webp";
    AboutUsDiv.appendChild(abousUsImg)

    const AboutUsDivBody = document.createElement("div");
    AboutUsDivBody.classList.add("card-body");
    AboutUsDiv.appendChild(AboutUsDivBody)

    const AboutUsDivTitle = document.createElement("h5");
    AboutUsDivTitle.classList.add("card-title");
    AboutUsDivTitle.textContent = "Let's talk about Movie Hub";
    AboutUsDivBody.appendChild(AboutUsDivTitle)
    

    const AboutUsDivTxt = document.createElement("P");
    AboutUsDivTxt.classList.add("card-text");
    AboutUsDivTxt.innerHTML = "The Movie Hub is a website built out of TMDb database. Our main goal is to bring you all the Movie information you need. New movies, Popular movies or Old movies; you'll find it all here. <br><br><strong> Enjoy browsing Movie Hub</strong>";
    AboutUsDivBody.appendChild(AboutUsDivTxt)
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

const fetchActor = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);
  const data = await res.json()
  return data.results;
};


let Actors = document.getElementById('Actor');
Actors.addEventListener("click", async function () {
  const ActorRender = await fetchActor();
  const CONTAINER = document.querySelector(".container-fluid");
  CONTAINER.innerHTML = "";
  renderActor(ActorRender);  
});

const renderActor = (movies) => {
  const CONTAINER = document.querySelector(".container-fluid");
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
    CardDiv.classList.add("card");
    movieImage.classList.add("card-img-top");
    movieTitle.classList.add("card-title");
    CardDiv.innerHTML = `
    <img src="${PROFILE_BASE_URL+movie.profile_path}" alt="${
      movie.name
    } poster">
        <h3>${movie.name}</h3>`;
    CardDiv.addEventListener("click", () => {
      RenderActorDetails(movie);
    });
    CardDiv.appendChild(movieImage);
    CardDiv.appendChild(movieTitle);
    divMovies.appendChild(CardDiv)
    CONTAINER.appendChild(divMovies);
  });
  
};
//////////////////////
const fetchUpcomingMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=542003918769df50083a13c415bbc602&language=en-US&page=1`;
  const res = await fetch(url);
  const data = await res.json()
  return data.results;
};
let UpcomingMovies = document.getElementById('up-coming');
UpcomingMovies.addEventListener("click", async function () {
  const UpcomingRender = await fetchUpcomingMovies();
  const CONTAINER = document.querySelector(".container-fluid");
  CONTAINER.innerHTML = "";
  renderfetchUpcomingMovies(UpcomingRender);  
});
console.log(fetchUpcomingMovies())
const renderfetchUpcomingMovies = (movies) => {
  const CONTAINER = document.querySelector(".container-fluid");
  const divMovies=document.createElement("div");
  const MoviesHeader=document.createElement("h1");
  MoviesHeader.innerHTML="Up Coming"
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
    <img src="${PROFILE_BASE_URL+movie.backdrop_path}" alt="${
      movie.title
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

let now_playing = document.getElementById('now-playing');
UpcomingMovies.addEventListener("click", async function () {
  const NowPlaying = await fetchUpcomingMovies();
  const CONTAINER = document.querySelector(".container-fluid");
  CONTAINER.innerHTML = "";
  renderMovies(NowPlaying);  
});


// Genres
const fetchGenre= async ()=>{
  const url = constructUrl(`genre/movie/list`)
  const res = await fetch(url)
  return res.json();
};
//getting the Genres name on the Nav Bar
let GenresBtn = document.querySelector('.GenresBtn');
GenresBtn.addEventListener("click", async function () {
  const GenresDownTab = await fetchGenre();
  console.log("GenresDownTab",GenresDownTab)
  renderNavGenres(GenresDownTab);  
});
  const moviesNav = document.getElementById('moviesNav');
  const renderNavGenres=(genres)=>{
    const GenresArray=genres.genres
    GenresArray.map((genre) => {
      const genreName = document.createElement("a")
      genreName.classList.add ("dropdown-item");
      genreName.textContent = `${genre.name}`
      genreName.addEventListener("click", function() {
        grenerDiscover(genre.id);
      });
      moviesNav.appendChild(genreName)
    });
  };
  // this is for the Genres Page
  const GenreArray = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
  const grenerDiscover= async(genre)=>{
    const movies = await fetchDiscover(genre);
    let CONTAINER = document.querySelector(".container-fluid");
    CONTAINER.innerHTML = ""
    renderGenres(movies,genre);
  }
  const  fetchDiscover= async(genresID)=>{
    const url = constructUrl(`discover/movie`) + `&with_genres=${genresID}`;
    const response = await fetch(url)
    const data = await response.json()
    console.log("the genres url",url);
    return data.results;
  }
  const renderGenres = (movies,genre) => {
    const CONTAINER = document.querySelector(".container-fluid");
    const divMovies=document.createElement("div");
    const MoviesHeader=document.createElement("h1");
    CONTAINER.setAttribute("style", "background-color: white;");
      for(let i=1;i<GenreArray.length;i++)
      {
        if(genre === GenreArray[i].id)
      {
        MoviesHeader.innerHTML=GenreArray[i].name
      } 
      }
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
          <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title
  } poster">
          <h4>${movie.title}</h4>`;
      CardDiv.addEventListener("click", () => {
        movieDetails(movie);
      });
      CardDiv.appendChild(movieImage);
      CardDiv.appendChild(movieTitle);
      divMovies.appendChild(CardDiv)
      CONTAINER.appendChild(divMovies);
    });
  };

// this is for fetching the Actor
  const fetchActorDetails = async (ActorId) => {
    const url = constructUrl(`person/popular/${ActorId}`);
    const res = await fetch(url);
    return res.json();
  };

  const ActorDetails = async (Actor) => {
    const movieRes = await fetchActorDetails(Actor.id);
    renderActorDetails(movieRes);
  };

  const RenderActorDetails = (Actor) => {
    const firstsection=document.querySelector(".FirstSection");
    console.log("Actor Details",Actor)
    firstsection.setAttribute("style", "background-image: url(" +BACKDROP_BASE_URL + Actor.profile_path+ ");background-size: cover;");
    CONTAINER.setAttribute("style", "background-color: white;");  
    CONTAINER.innerHTML = `
    <div class="movDetail">
      <div class="row">
          <div class="col-md-8">
              <h2 id="movie-title">${Actor.name}</h2>
              <p id="movie-release-date"><b>Release Date:</b> ${
                Actor.release_date
              }</p>
              <p id="movie-runtime"><b>Runtime:</b> ${Actor.runtime} Minutes</p>
              <h3>Overview:</h3>
              <p id="movie-overview">${Actor.overview}</p>
          </div>
          </div>
              <h3>Actors:</h3>
              <ul id="actors" class="list-unstyled">${Actor.actors}</ul>
      </div>`;
  };



const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=23381f9d606c6cff00c6543b3446c4ad&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=23381f9d606c6cff00c6543b3446c4ad&query=" '
const main = document.getElementById("content");
const searchValue = document.getElementById("search");

//Search Bar
const searchconstructUrl = (search) => {
  return `${TMDB_BASE_URL}/search/multi?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}&query=${search}`;
};

const searchRes = async (search) => {
  const url = searchconstructUrl(search);
  const res = await fetch(url);
  console.log("res",res);
  return res.json();
}

const renderSearch = async (data) => {
  const CONTAINER = document.querySelector(".container-fluid");
  CONTAINER.innerHTML = "";
  //const resDat = await searchRes(data)
  const searchContent = document.getElementById("content");
  const divMovies=document.createElement("div");
  divMovies.classList.add("d-flex",
  "flex-row",
  "flex-wrap","justify-content-around"
  );
  data.results.forEach(element => {
    if (element.media_type == undefined) {
      alert("undefined")
    } 
    else if (element.media_type === "movie"){
        const CardDiv = document.createElement("div");
        const movieImage = document.createElement("img");
        const movieTitle = document.createElement("h3");
        CardDiv.classList.add("card");
        movieImage.classList.add("card-img-top");
        movieTitle.classList.add("card-title");
        CardDiv.innerHTML = `
            <img src="${PROFILE_BASE_URL + element.backdrop_path}" alt="${
              element.title
        } poster">
            <h3>${element.title}</h3>`;
        CardDiv.addEventListener("click", () => {
          movieDetails(element);
        });
        CardDiv.appendChild(movieImage);
        CardDiv.appendChild(movieTitle);
        divMovies.appendChild(CardDiv)
        CONTAINER.appendChild(divMovies);
      }
      //////////////////
    else if(element.media_type === "person"){
      console.log("sssssss",element)
      const CardDiv = document.createElement("div");
        const movieImage = document.createElement("img");
        const movieTitle = document.createElement("h3");
        CardDiv.classList.add("card");
        movieImage.classList.add("card-img-top");
        movieTitle.classList.add("card-title");
        CardDiv.innerHTML = `
            <img src="${PROFILE_BASE_URL + element.backdrop_path}" alt="${
              element.name
        } poster">
            <h3>${element.name}</h3>`;
        CardDiv.addEventListener("click", () => {
          movieDetails(element);
        });
        CardDiv.appendChild(movieImage);
        CardDiv.appendChild(movieTitle);
        divMovies.appendChild(CardDiv)
        CONTAINER.appendChild(divMovies);
      }
});
}
let form = document.getElementById("searchBtn");
form.addEventListener("click", async (e) => {
  e.preventDefault();
  const results = await searchRes(searchValue.value);
  console.log("ssss",results)
  renderSearch(results);
});
document.addEventListener("DOMContentLoaded", autorun);

