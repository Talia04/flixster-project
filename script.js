const apiKey = 'c666be630baaddcdc7f5bb1eac153e04';
let moviePage = 1;
let movieData = {};

const moviesContainer = document.getElementById('movies-grid');
const closeSearchButton = document.getElementById('search-icon');

const fetchData = async () => {
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${moviePage}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (moviePage === 1) {
      movieData = data;
    } else {
      movieData.results.push(...data.results);
    }

    displayMovies(data);
  } catch (error) {
    console.log('Error:', error);
  }
};

function displayMovies(data) {
  const movies = data.results;

  movies.forEach(movie => {
    const { title, poster_path: poster, vote_average: votes, overview: description } = movie;
    const baseUrl = 'http://image.tmdb.org/t/p/';

    const movieInfo = document.createElement('div');
    movieInfo.className = 'movie-card';

    const movieTitle = document.createElement('h2');
    movieTitle.className = 'movie-title';
    movieTitle.textContent = title;

    const moviePoster = document.createElement('img');
    moviePoster.className = 'movie-poster';
    moviePoster.alt = 'Movie Poster';
    moviePoster.src = `${baseUrl}w300${poster}`;

    const movieVotes = document.createElement('h3');
    movieVotes.className = 'movie-votes';
    movieVotes.textContent = `⭐️ ${votes}`;

    const movieDescription = document.createElement('div');
    movieDescription.className = 'movie-description';
    movieDescription.textContent = description;

    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';

    closeButton.addEventListener('click', () => {
      movieDescription.style.display = 'none';
    });

    movieDescription.appendChild(closeButton);

    movieInfo.appendChild(moviePoster);
    movieInfo.appendChild(movieTitle);
    movieInfo.appendChild(movieVotes);
    movieInfo.appendChild(movieDescription);

    movieInfo.addEventListener('mouseenter', () => {
      movieInfo.timerId = setTimeout(() => {
        movieDescription.style.display = 'block';
      }, 3500);
    });

    movieInfo.addEventListener('mouseleave', () => {
      clearTimeout(movieInfo.timerId);
      movieDescription.style.display = 'none';
    });

    moviesContainer.appendChild(movieInfo);
  });
}

const loadMoreButton = document.getElementById('load-more-movies-btn');

const loadMoreMovies = async () => {
  moviePage++;
  const searchValue = searchInput.value;
  const searchUrl = searchValue
    ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchValue}&page=${moviePage}`
    : `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${moviePage}`;

  try {
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (searchValue) {
      movieData = data;
    } else {
      movieData.results.push(...data.results);
    }

    displayMovies(data);
  } catch (error) {
    console.log('Error:', error);
  }
};

loadMoreButton.addEventListener('click', loadMoreMovies);

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    performMovieSearch(searchInput.value);
  }
});

searchBtn.addEventListener('click', event => {
  performMovieSearch(searchInput.value);
});

const performMovieSearch = async query => {
  clearMovies();
  moviePage = 1;
  movieData = {};

  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

  try {
    const response = await fetch(searchUrl);
    const data = await response.json();

    movieData = data;
    displayMovies(movieData);
  } catch (error) {
    console.log('Error:', error);
  }
};

closeSearchButton.addEventListener('click', event => {
  clearMovies();
  closeSearch();
});

function clearMovies() {
  moviesContainer.innerHTML = '';
}

function closeSearch() {
  searchInput.value = '';
  fetchData();
}

fetchData();
