'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container-fluid");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  CONTAINER.innerHTML = "";
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
  const trailer=await fetchVideo(movie.id)
  const MainActors=await fetchActors(movie.id);
  const SimailarMovies=await fetchSimilarMovies(movie.id)
  CONTAINER.innerHTML = "";
  renderMovie(movieRes,trailer,MainActors,SimailarMovies);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  CONTAINER.innerHTML = "";
  return res.json();
};

const fetchActor = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);
  const data = await res.json()
  CONTAINER.innerHTML = "";
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
    CardDiv.classList.add("cardAct");
    movieImage.classList.add("card-img-top");
    movieTitle.classList.add("card-title");
    CardDiv.innerHTML = `
    <img class= "cardAct" src="${PROFILE_BASE_URL+movie.profile_path}" alt="${
      movie.name
    } poster">
        <h3>${movie.name}</h3>`;
    CardDiv.addEventListener("click", () => {
      ActorDetails(movie);
    });
    CardDiv.appendChild(movieImage);
    CardDiv.appendChild(movieTitle);
    divMovies.appendChild(CardDiv)
    CONTAINER.appendChild(divMovies);
  });

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



const fetchVideo=async(movie_id)=>{
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=542003918769df50083a13c415bbc602&language=en-US`
  const response = await fetch(url)
  const trailer = await response.json()
  return trailer.results
}

const ActorsofMovies = async (movie) => {
  const movieRes = await fetchActors(movie);
  console.log(movieRes)
  CONTAINER.innerHTML = "";
  return movieRes
};
const fetchActors= async(movieId) =>{
  const url = constructUrl(`movie/${movieId}/credits`);
  const response = await fetch(url);
  const data = await response.json();
  console.log("credit",data)
  return data;
}

const fetchSimilarMovies= async(movieId) =>{
  const url = constructUrl(`movie/${movieId}/similar`);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data)
  return data.results;
}
const fetchActorCredits = async (ActorId) => {
  const url = constructUrl(`person/${ActorId}/movie_credits`);
  const response = await fetch(url);
  console.log(url)
  const data = await response.json();
  return data
};
const fetchActorDetails = async (ActorId) => {
  const url = constructUrl(`person/${ActorId}`);
  console.log(url)
  const res = await fetch(url);
  return res.json();
};

const ActorDetails = async (Actor) => {
  const movieRes = await fetchActorDetails(Actor.id);
  const ActorRes= await fetchActorCredits(Actor.id);
  console.log(movieRes,ActorRes)
  CONTAINER.innerHTML = "";
  RenderActorDetails(movieRes,ActorRes);
};


const RenderActorDetails = (Actor,credits) => {
  console.log(Actor);
  console.log(credits);
  let gender="female"
  if(Actor.gender==1)
  {
    gender="female"
  }
  else{
    gender="male"
  }
  //CONTAINER.setAttribute("style", "background-image: url(" +BACKDROP_BASE_URL + Actor.profile_path+ ");background-size: contain; background-position: left top; background-repeat: no-repeat; background-size: 500px 700px;");
  CONTAINER.innerHTML = `
  <div class="movDetail">
    <div class="row">
    <div class="col-md-3">
        <img src="${BACKDROP_BASE_URL + Actor.profile_path}" class="singleActorPic" class="ml-3 mt-3">
      </div>
    <div class="col-lg-8 col-md-12 col-sm-12">
    <h2 id="actor-name"><span>${Actor.name}</span></h2>
    <h4>Gender:</h4>
    <p id="gender">${gender}</p>
    <h4>Popularity:</h4>
    <p id="popularity">${Actor.popularity}</p>
    <h4>Birthday:</h4>
    <p id="birthday">${Actor.birthday}</p>
    <p id="death"></p>
    <h4>Biography:</h4>
     <p id="biography" style="color:#BDBDBD; font-size: .8rem;">${Actor.biography}</p><br><br><br><br><br><br><br><br>
  </div></div>`;
  if (Actor.deathDay) {
    const birthday = document.querySelector(".death");
    birthday.insertAdjacentHTML(
      "afterend",
      `<p><span style="color: gray">Died:</span> ${Actor.deathDay}</p>`
    );
  }
  const ActorMovies=document.createElement("div");
  const MoviesHeader=document.createElement("h1");
  MoviesHeader.innerHTML="Paticipated Movies"
  CONTAINER.appendChild(MoviesHeader)
  ActorMovies.classList.add("d-flex",
  "flex-row",
  "flex-wrap","justify-content-around",
  );
      for (let i = 0; i < 5; i++) {
        const CardDiv = document.createElement("div");
        const movieImage = document.createElement("img");
        const movieTitle = document.createElement("h3");
        CardDiv.classList.add("cardAct");
        movieImage.classList.add("card-img-top");
        movieTitle.classList.add("card-title");
        CardDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL +  credits.cast[i].backdrop_path}" alt="${
          credits.cast[i].title
        } poster">
            <h3>${credits.cast[i].title}</h3>`;
        CardDiv.addEventListener("click", () => {
          movieDetails(credits.cast[i]);
        });
        CardDiv.appendChild(movieImage);
        CardDiv.appendChild(movieTitle);
        ActorMovies.appendChild(CardDiv)
        CONTAINER.appendChild(ActorMovies);
    };
};
// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  console.log(movies)
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
        <h4 class="contentCard" >${movie.title}</h4>
        <h6 class="contentCard" >Rating: ${movie.vote_average}</h6>
        <h6 class="contentCard" > Release Date :${movie.release_date}</h6>`;
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
const renderMovie = (movie,trailer,Actors,Similar) => {
  CONTAINER.setAttribute("style", "background-color: white; color:white");
  CONTAINER.innerHTML = `
  <div class="movDetail1">
    <div class="row">
        <div class="col-md-8">
        <img  src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title
        } poster">
        <div class="more_info">
        <h4>${movie.title}</h4>
        <p id="movie-release-date">${movie.release_date}</p>
        <p id="movie-runtime">Runtime: ${movie.runtime} mins</p>
        </div>
      <h5>Overview:</h5>
      <p id="movie-overview">${movie.overview}</p>
      <div class="more_info">
      <p> ${movie.vote_average}/10</p>
      <p> ${movie.vote_count}</p>
      </div>
      <div class="more_info">
              <p id="director"></p>
              <p>Langauges:
              <p class="language"></p></p>
            </div>
          <br>
          <div id="Production-Companies">

            </div>
    <iframe
    class="iframe"
        height="300"
        width="580"
        src="https://www.youtube.com/embed/${trailer[0].key}"
        title="${trailer[0].name}"
        frameborder="0"
        allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>
    </div></div>`
    const divMovies=document.createElement("div");
    divMovies.classList.add("d-flex",
    "flex-row",
    "flex-wrap",
    );
      for (let i = 0; i < 5; i++) {
          const CardDiv = document.createElement("div");
          const movieImage = document.createElement("img");
          const movieTitle = document.createElement("h3");
          CardDiv.classList.add("cardAct");
          movieImage.classList.add("card-img-top");
          movieTitle.classList.add("card-title");
          CardDiv.innerHTML = `
          <img src="${BACKDROP_BASE_URL + Actors.cast[i].profile_path}" alt="${
            Actors.cast[i].name
          } poster">
              <h3>${Actors.cast[i].name}</h3>`;
              CardDiv.addEventListener("click", () => {
                ActorDetails(Actors.cast[i]);
              });
          CardDiv.appendChild(movieImage);
          CardDiv.appendChild(movieTitle);
          divMovies.appendChild(CardDiv)
          CONTAINER.appendChild(divMovies);
      };
      const divsimilar=document.createElement("div");
      divsimilar.classList.add("d-flex",
    "flex-row",
    "flex-wrap","justify-content-around"
    );
  const Divvv=document.createElement("div");
  const MoviesHeader=document.createElement("h1");
  MoviesHeader.innerHTML="Similar Movies"
  CONTAINER.appendChild(MoviesHeader)
  Divvv.classList.add("d-flex",
  "flex-row",
  "flex-wrap",
  );
      for (let i = 0; i < 5; i++) {
        const CardDiv = document.createElement("div");
        const movieImage = document.createElement("img");
        const movieTitle = document.createElement("h3");
        CardDiv.classList.add("cardAct");
        movieImage.classList.add("card-img-top");
        movieTitle.classList.add("card-title");
        CardDiv.innerHTML = `<br>
        <img src="${BACKDROP_BASE_URL +  Similar[i].poster_path}" alt="${
          Similar[i].title
        } poster">
            <h3>${Similar[i].title}</h3>`;
        CardDiv.addEventListener("click", () => {
          ActorDetails(movie);
        });
        CardDiv.appendChild(movieImage);
        CardDiv.appendChild(movieTitle);
        Divvv.appendChild(CardDiv)
        CONTAINER.appendChild(Divvv);
    };
    console.log(movie.spoken_languages.length)
    for (let i=0;i<movie.spoken_languages.length;i++) {
      console.log(movie.spoken_languages[i])
        const language = document.querySelector(".language");
        language.innerText += " "+`${movie.spoken_languages[i].english_name}`;
    }
    for (let i=0;i<Actors.crew.length;i++) {
      if (Actors.crew[i].known_for_department=="Directing") {
        const director = document.getElementById("director");
        console.log(Actors.crew[i].name)
        director.innerHTML = `Director: ${Actors.crew[i].name}`;
        break;
      }
    }
  const mainDiv=document.createElement("div");
  const CompaniesHeader=document.createElement("h1");
  CompaniesHeader.innerHTML="Companies"
  CONTAINER.appendChild(CompaniesHeader)
  mainDiv.classList.add("d-flex",
  "flex-row",
  "flex-wrap",
  );
    for (let i = 0; i < movie.production_companies.length; i++) {
      const CardDiv = document.createElement("div");
        const movieImage = document.createElement("img");
        const movieTitle = document.createElement("h3");
        CardDiv.classList.add("cardAct");
        movieImage.classList.add("card-img-top");
        movieTitle.classList.add("card-title");
        CardDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL +  movie.production_companies[i].logo_path}" alt="${
          movie.production_companies[i].name
        } poster">
            <h3>${movie.production_companies[i].name}</h3>`;
        CardDiv.appendChild(movieImage);
        CardDiv.appendChild(movieTitle);
        mainDiv.appendChild(CardDiv)
        CONTAINER.appendChild(mainDiv);
      }
};
let aboutUsNav = document.getElementById('about-us');
//adding  event listner to actors in navbar
aboutUsNav.addEventListener("click", async function () {
  CONTAINER.innerHTML = "";
  const AboutUsDiv = document.createElement("div");
  AboutUsDiv.classList.add("aboutUsBody");
  //AboutUsDiv.classList.add("mb-3");
  CONTAINER.appendChild(AboutUsDiv)

  const abousUsImg = document.createElement("img");
  abousUsImg.classList.add("aboutUsImage");
  abousUsImg.src = "./images/aboutus.png";
  AboutUsDiv.appendChild(abousUsImg)

  const AboutUsDivBody = document.createElement("div");
  AboutUsDivBody.classList.add("card-body");
  AboutUsDiv.appendChild(AboutUsDivBody)

  const AboutUsDivTitle = document.createElement("h5");
  AboutUsDivTitle.classList.add("aboutUs");
  AboutUsDivTitle.textContent = "A better version of NETFLIX";
  AboutUsDivBody.appendChild(AboutUsDivTitle)


  const AboutUsDivTxt = document.createElement("p");
  AboutUsDivTxt.classList.add("aboutUs");
  AboutUsDivTxt.innerHTML = "<br>This is a movie database project, where it shows movies, their casts, ratings, trailers, related movies, genres, and so on.This project uses The Movie DB API: https://api.themoviedb.org/3. It is up to you to use your Google and Postman skills to explore the API and understand the data.";
  AboutUsDivBody.appendChild(AboutUsDivTxt)

});


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
        <h3>${movie.title}</h3>`;//classes can be changed
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
    const review = document.createElement("h5");
    const cardGen = document.createElement("h5");
    CardDiv.classList.add("card");
    movieImage.classList.add("card-img-top");
    movieTitle.classList.add("card-title");
    review.classList.add("card-text");
    cardGen.classList.add("card-text");
    CardDiv.innerHTML = `
    <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
        <h3>${movie.title}</h3>
        `;//need to add these for card
    CardDiv.addEventListener("click", () => {
      movieDetails(movie);
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
const renderfetchUpcomingMovies = (movies) => {
  console.log(movies)
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

const NowPlayingMovies = (movies) => {
  console.log(movies)
  const CONTAINER = document.querySelector(".container-fluid");
  const divMovies=document.createElement("div");
  const MoviesHeader=document.createElement("h1");
  MoviesHeader.innerHTML="Now Playing"
  CONTAINER.appendChild(MoviesHeader)
  divMovies.classList.add("d-flex",
  "flex-row",
  "flex-wrap","justify-content-around"
  );
  movies.results.map((movie) => {
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


let now_playing = document.getElementById('now-playing');
now_playing.addEventListener("click", async function () {
  const NowPlaying = await fetchMovies();
  const CONTAINER = document.querySelector(".container-fluid");
  CONTAINER.innerHTML = "";
  NowPlayingMovies(NowPlaying);
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
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=23381f9d606c6cff00c6543b3446c4ad&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=23381f9d606c6cff00c6543b3446c4ad&query=" '
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