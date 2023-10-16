const filmsList = document.getElementById('films');
const movieDetails = document.getElementById('movie-details');
// Function to fetch and display movies
function fetchAndDisplayMovies() {
  fetch('http://localhost:3000/films')
    .then((response) => response.json())
    .then((movies) => {
      filmsList.innerHTML = '';

      movies.forEach((movie) => {
        const listItem = document.createElement('li');
        listItem.classList.add('film', 'item');
        listItem.textContent = movie.title;
        listItem.addEventListener('click', () => displayMovieDetails(movie));
        filmsList.appendChild(listItem);
      });

      if (movies.length > 0) {
        // Display details of the first movie
        displayMovieDetails(movies[0]);
      }
    })
    .catch((error) => {
      console.error('Error loading movie data:', error);
    });
}

// Function to display movie details
function displayMovieDetails(movie) {
  movieDetails.querySelector('#movie-poster').src = movie.poster;
  movieDetails.querySelector('#movie-title').textContent = movie.title;
  movieDetails.querySelector('#movie-runtime').textContent = `Runtime: ${movie.runtime} minutes`;
  movieDetails.querySelector('#movie-showtime').textContent = `Showtime: ${movie.showtime}`;
  movieDetails.querySelector('#movie-tickets').textContent = `Available tickets: ${movie.capacity - movie.tickets_sold}`;

  const buyButton = movieDetails.querySelector('#buy-ticket');
  buyButton.disabled = movie.capacity - movie.tickets_sold === 0;
  buyButton.textContent = movie.capacity - movie.tickets_sold === 0 ? 'Sold Out' : 'Buy Ticket';
}

// Initialize the app
fetchAndDisplayMovies();
