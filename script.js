const apiKey = 'c666be630baaddcdc7f5bb1eac153e04';
let moviePage = 1
const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${moviePage}`;


// Fetch data from the API using async/await
const fetchData = async (moviePage) => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Handle the retrieved data here
    console.log(data);
   
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
  const moviesContainer = document.getElementById("movies-grid");

  movies.forEach(movie => {
    // Extract relevant movie information (title, poster, votes)
    const title = movie.title;
    const baseUrl = 'http://image.tmdb.org/t/p/';
    const poster = movie.poster_path;
    const votes = movie.vote_average;

    // Dynamically Create HTML elements to display movie details
    const movieInfo = document.createElement('div');
    movieInfo.className = "movie-card";
    const movieTitle = document.createElement('h2');
    movieTitle.className = "movie-title";
    const moviePoster = document.createElement('img');
    moviePoster.className = "movie-poster";
    const movieVotes = document.createElement('h3');
    movieVotes.className = "movie-votes";
    
    // Set the movie details to the created elements
    movieTitle.textContent = title;
    moviePoster.src = baseUrl+'w500'+poster;
    movieVotes.textContent = votes;

    // Append the movie info to the movie card
    movieInfo.appendChild(moviePoster);
    movieInfo.appendChild(movieTitle);
    movieInfo.appendChild(movieVotes);
    
    //append the movie card to the movie container
    moviesContainer.appendChild(movieInfo);

   });
}

// Call the fetchData function to fetch and display the movie information
fetchData();

const loadMoreButton = document.getElementById('load-more-movies-btn');


const loadMoreMovies = async() =>{
    const movies = await fetchData(moviePage);
    displayMovies(movies);
    moviePage ++;

}
loadMoreButton.addEventListener('click', loadMoreMovies);
