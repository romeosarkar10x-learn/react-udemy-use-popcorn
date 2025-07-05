import "./index.scss";

import BoxToggleButton from "../BoxToggleButton.jsx";

function WatchedMovie({ watchedMovie }) {
    return (
        <li
            className="watched-movie"
            key={watchedMovie.imdbID}>
            <img
                className="poster"
                src={watchedMovie.poster}
                alt={`${watchedMovie.pitle} poster`}
            />
            <h3>{watchedMovie.title}</h3>
            <div className="rating">
                <p className="imdb-rating">
                    <span>⭐️</span>
                    <span>{watchedMovie.imdbRating}</span>
                </p>
                <p className="user-rating">
                    <span>🌟</span>
                    <span>{watchedMovie.userRating}</span>
                </p>
            </div>
            <div className="time">
                <span>⏳</span>
                <time>{watchedMovie.runtime} minutes</time>
            </div>
            <button className="remove">⛌</button>
        </li>
    );
}

export default function WatchedMovieList({ watchedMovies }) {
    return (
        <ul className="component-watched-movie-list">
            {watchedMovies.map(watchedMovie => (
                <WatchedMovie watchedMovie={watchedMovie} />
            ))}
        </ul>
    );
}
