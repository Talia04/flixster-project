const apiKey = 'c666be630baaddcdc7f5bb1eac153e04';
let moviePage = 1;
let movieData = {}; // Dictionary to store movie data

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
      const description = movie.overview;
  
      // Dynamically create HTML elements to display movie details
      const movieInfo = document.createElement('div');
      movieInfo.className = 'movie-card';
      const movieTitle = document.createElement('h2');
      movieTitle.className = 'movie-title';
      const moviePoster = document.createElement('img');
      moviePoster.className = 'movie-poster';
      moviePoster.alt = "Movie Poster";
      const movieVotes = document.createElement('h3');
      movieVotes.className = 'movie-votes';
    //   const movieDescription = document.createElement('div');
    //   movieDescription.className = 'movie-description';
  
      // Set the movie details to the created elements
      movieVotes.textContent = '⭐️       ' + votes;
      movieTitle.textContent = title;
      moviePoster.src = baseUrl + 'w300' + poster;
  
    //   movieDescription.textContent = description;
  
      // Append the movie info to the movie card
      movieInfo.appendChild(moviePoster);
      movieInfo.appendChild(movieTitle);
      movieInfo.appendChild(movieVotes);
    //   movieInfo.appendChild(movieDescription);
  
      // Create a button to watch the movie trailer
      const movieTrailerButton = document.createElement('button');
      movieTrailerButton.className = 'movie-trailer-button';
      movieTrailerButton.textContent = 'Watch Trailer';
      movieTrailerButton.addEventListener('click', async () => {
        await displayMovieDescription(title, description, movieInfo);
      });
  
      // Append the movie trailer button to the movie card
      movieInfo.appendChild(movieTrailerButton);
  
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
    const response = await fetch(searchUrl);
    const data = await response.json();
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

async function getMovieTrailerByTitle(movieTitle) {
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieTitle)}`;

  try {
    const response = await fetch(searchUrl);
    const data = await response.json();
    const movies = data.results;
    if (movies.length > 0) {
      const movieId = movies[0].id;
      return getMovieTrailerById(movieId);
    } else {
      throw new Error('Movie not found');
    }
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

async function getMovieTrailerById(movieId) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const videos = data.results;
    const trailer = videos.find(
      video => video.type === 'Trailer' && video.site === 'YouTube'
    );
    const videoKey = trailer ? trailer.key : null;
    if (videoKey) {
      const embedCode = generateYouTubeEmbedCode(videoKey);
      return embedCode;
    } else {
      throw new Error('Trailer not found');
    }
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

function generateYouTubeEmbedCode(videoKey) {
  return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoKey}" frameborder="0" allowfullscreen></iframe>`;
}

// Function to display the movie description and trailer in a pop-up window
async function displayMovieDescription(title, description, selectedMovieElement) {
  const movieTrailerUrl = await getMovieTrailerByTitle(title);

  const popUpContainer = document.createElement('div');
  popUpContainer.className = 'popup-container';

  const movieDescriptionElement = document.createElement('div');
  movieDescriptionElement.className = 'movie-description-element';
  movieDescriptionElement.textContent = description;

  const exitButton = document.createElement('button');
  exitButton.className = 'exit-button';
  exitButton.textContent = 'Exit';
  exitButton.addEventListener('click', () => {
    closePopUp(popUpContainer);
  });

  popUpContainer.appendChild(movieDescriptionElement);
  popUpContainer.innerHTML += movieTrailerUrl;
  popUpContainer.appendChild(exitButton);

  document.body.appendChild(popUpContainer);
}

// Function to close the pop-up window
function closePopUp(popUpContainer) {
  document.body.removeChild(popUpContainer);
}
