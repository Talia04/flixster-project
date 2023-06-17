const apiKey = 'c666be630baaddcdc7f5bb1eac153e04';
let moviePage = 1;
let movieData = {}; // Dictionary to store movie data

const moviesContainer = document.getElementById('movies-grid');
const closeSearchButton = document.getElementById('search-icon');

// Fetch data from the API using async/await
const fetchData = async () => {
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${moviePage}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Handle the retrieved data here
    console.log(data);

    if (moviePage === 1) {
      movieData = data;
    } else {
      movieData.results.push(...data.results);
    }

    displayMovies(data);
  } catch (error) {
    // Handle any errors that occur during the request
    console.log('Error:', error);
  }
};

// Function to process and display the movie information
function displayMovies(data) {
  // Access the movie details from the API response
  const movies = data.results;

  movies.forEach(movie => {
    // Extract relevant movie information (title, poster, votes)
    const title = movie.title;
    const baseUrl = 'http://image.tmdb.org/t/p/';
    const poster = movie.poster_path;
    const votes = movie.vote_average;

    // Dynamically Create HTML elements to display movie details
    const movieInfo = document.createElement('div');
    movieInfo.className = 'movie-card';
    const movieTitle = document.createElement('h2');
    movieTitle.className = 'movie-title';
    const moviePoster = document.createElement('img');
    moviePoster.className = 'movie-poster';
    moviePoster.alt = "Movie Poster";
    const movieVotes = document.createElement('h3');
    movieVotes.className = 'movie-votes';

    // Set the movie details to the created elements
    movieTitle.textContent = title;
    moviePoster.src = baseUrl + 'w300' + poster;
    movieVotes.textContent = '⭐️       ' + votes;

    // Append the movie info to the movie card
    movieInfo.appendChild(moviePoster);
    movieInfo.appendChild(movieTitle);
    movieInfo.appendChild(movieVotes);

    // Append the movie card to the movie container
    moviesContainer.appendChild(movieInfo);
  });
}

// Call the fetchData function to fetch and display the movie information
fetchData();

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

// Event listener for the search input
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    console.log(searchInput.value);
    performMovieSearch(searchInput.value);
  }
});

searchBtn.addEventListener('click', event => {
  performMovieSearch(searchInput.value);
});

async function performMovieSearch(query) {
  // Clear existing movies
  clearMovies();
  moviePage = 1; // Reset movie page
  movieData = {}; // Reset movie data dictionary

  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

  try {
    console.log('Hello');
    const response = await fetch(searchUrl);
    const data = await response.json();
    console.log(data);
    movieData = data;
    displayMovies(movieData);
  } catch (error) {
    console.log('Error:', error);
  }
}

// Event listener for the close search button
closeSearchButton.addEventListener('click', event => {
  clearMovies();
  closeSearch();
});

function clearMovies() {
  moviesContainer.innerHTML = '';
}

function closeSearch() {
  // Clear search input
  searchInput.value = '';

  // Reload current movies
  fetchData();
}
