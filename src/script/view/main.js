import '../component/movie-list.js';
import DataSource from '../data/data-source.js';
import DataDetails from '../data/data-details.js';

var main = () => {
    const movieListElement = document.querySelector("movie-list");
    const buttonSearch = document.getElementById('searchButtonElement');
    const valueSearch = document.getElementById('searchFilm');

    const onButtonSearchClicked = async() => {
        try {
            const result = await DataSource.searchMovie(valueSearch.value);
            renderResult(result);
        } catch (message) {
            fallbackResult(message);
        }
    };

    const renderResult = results => {
        movieListElement.movies = results;
    };

    const fallbackResult = message => {
        movieListElement.renderError(message);
    };

    buttonSearch.addEventListener('click', onButtonSearchClicked);

    document.addEventListener('click', async function(element) {
        if (element.target.classList.contains('overlay-movie-details')) {
            try {
                const movieId = element.target.dataset.movieid;
                const movieDetails = await DataDetails.showDetailMovie(movieId);
                modalMovieDetails(movieDetails);
            } catch (message) {
                console.log(message);
            }
        }
    });

    function modalMovieDetails(movieDetails) {
        const movieDetail = showDetailMovie(movieDetails);
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = movieDetail;
    }

    function showDetailMovie(movieDetails) {
        return `
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <img src="https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}" alt="No Image" class="img-fluid">
                    <p><strong>Vote Average : </strong>${movieDetails.vote_average}</p>
                </div>
                <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item"><h4>${movieDetails.title} <span style="color:grey;">(${movieDetails.release_date})</span></h4></li>
                        <li class="list-group-item"><strong>Production Companie : </strong>${movieDetails.production_companies[0].name}</li>
                        <li class="list-group-item"><strong>Popularity : </strong>${movieDetails.popularity}</li>
                        <li class="list-group-item"><strong>Overview</strong>: <br>${movieDetails.overview}</li>
                    </ul>
                </div>
            </div>
        </div>
        `
    }
};

export default main;