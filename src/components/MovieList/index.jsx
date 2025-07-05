import "./index.scss";

function Movie({ movie, onSelectMovie }) {
    return (
        <li
            className="movie"
            onClick={() => onSelectMovie(movie.imdbID)}>
            <img
                className="poster"
                src={movie.Poster}
                alt={`${movie.Title} poster`}
            />
            <h3>{movie.Title}</h3>
            <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
                <span>║</span>
                <span>
                    IMDb{" "}
                    <a
                        className="imdb-link"
                        target="_blank"
                        href={`https://www.imdb.com/title/${movie.imdbID}/`}>
                        {movie.imdbID}
                    </a>
                </span>
            </p>
        </li>
    );
}

export default function MovieList({ movies, onSelectMovie }) {
    return (
        <ul className="component-movie-list">
            {movies?.map(movie => (
                <Movie
                    key={crypto.randomUUID()}
                    movie={movie}
                    onSelectMovie={onSelectMovie}
                />
            ))}
        </ul>
    );
}
