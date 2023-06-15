const apiKey = 'c666be630baaddcdc7f5bb1eac153e04';
const apiUrl = `http://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;



// Fetch data from the API using async/await
const fetchData = async () => {
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
  const moviesContainer = document.getElementById("moviesContainer");

  movies.forEach(movie => {
    // Extract relevant movie information (e.g., title, poster, description)
    const title = movie.title;
    const baseUrl = 'http://image.tmdb.org/t/p/';
    const poster = movie.poster_path;

    // Dynamically Create HTML elements to display movie details
    const movieInfo = document.createElement('div');
    const movieTitle = document.createElement('h2');
    const moviePoster = document.createElement('img');
    movieInfo
    // Set the movie details to the created elements
    movieTitle.textContent = title;
    moviePoster.src = baseUrl+'w500'+poster;

    // Append the movie elements to the webpage
    movieInfo.appendChild(moviePoster);
    movieInfo.appendChild(movieTitle);
    
    moviesContainer.appendChild(movieInfo);

   });
}

// Call the fetchData function to fetch and display the movie information
fetchData();


