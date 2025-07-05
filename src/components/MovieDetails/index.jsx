import { useState, useEffect } from "react";
import { OMDB_API_KEY } from "../../globals.js";
import "./index.scss";

import StarRating from "../StarRating/index.jsx";
import Loading from "../Loading/index.jsx";

export default function MovieDetails({
    id,
    watchedMovies,
    onCloseMovie,
    onAddWatchedMovie,
    userRating,
    setUserRating,
}) {
    const [movie, setMovie] = useState({ isLoading: false });

    useEffect(
        function () {
            setMovie({ isLoading: true });

            (async function getMovieDetails() {
                const res = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`);

                const movie = await res.json();
                console.log(movie);

                setUserRating(0);
                setMovie({
                    isLoading: false,
                    poster: movie.Poster,
                    actors: movie.Actors,
                    genre: movie.Genre,
                    language: movie.Language,
                    plot: movie.Plot,
                    rated: movie.Rated,
                    runtime: movie.Runtime,
                    title: movie.Title,
                    year: movie.Year,
                    writer: movie.Writer,
                    released: movie.Released,
                    director: movie.Director,
                    imdbID: movie.imdbID,
                    imdbRating: movie.imdbRating,
                    imdbVotes: movie.imdbVotes,
                });
            })();
        },
        [id],
    );

    useEffect(
        function () {
            if (!movie.title) {
                return;
            }

            const oldTitle = document.title;
            document.title = `Movie | ${movie.title}`;

            return function () {
                document.title = oldTitle;
            };
        },
        [movie.title],
    );

    const index = watchedMovies.findIndex(watchedMovie => watchedMovie.imdbID == id);
    console.log("Index:", index);

    return movie.isLoading ? (
        <Loading />
    ) : (
        <div className="component-movie-details">
            <button
                className="back"
                onClick={onCloseMovie}>
                &larr;
            </button>
            <header>
                <img
                    className="poster"
                    src={movie.poster}
                />
                <div className="overview">
                    <h2>{movie.title}</h2>
                    <p>
                        <span>Released: </span>
                        <span>{movie.released}</span>
                    </p>
                    <p>
                        <span>Runtime: </span>
                        <span>{movie.runtime}</span>
                    </p>
                    <p>
                        <span>Genre: </span>
                        <span>{movie.genre}</span>
                    </p>
                    <p className="imdb-rating">
                        <span>IMDb Rating: </span>
                        <span>
                            <span role="img">⭐</span>
                            {movie.imdbRating} / 10
                        </span>
                    </p>
                    <p>
                        <span>IMDb ID: </span>
                        <a
                            className="imdb-link"
                            href={`https://www.imdb.com/title/${movie.imdbID}/`}>
                            {movie.imdbID}
                        </a>
                    </p>
                </div>
            </header>

            <section>
                <div className="rating">
                    {index > -1 ? (
                        (console.log("Ha ha ha here!"),
                        (
                            <StarRating
                                rating={watchedMovies[index].userRating}
                                maxRating={10}
                            />
                        ))
                    ) : (
                        <>
                            <StarRating
                                rating={userRating}
                                setRating={setUserRating}
                                maxRating={10}
                            />
                            {userRating > 0 && (
                                <button
                                    className="add-to-list"
                                    onClick={() =>
                                        onAddWatchedMovie({
                                            imdbID: movie.imdbID,
                                            title: movie.title,
                                            year: movie.year,
                                            poster: movie.poster,
                                            runtime: parseInt(movie.runtime),
                                            imdbRating: parseFloat(movie.imdbRating),
                                            userRating: userRating,
                                        })
                                    }>
                                    Add to list
                                </button>
                            )}
                        </>
                    )}
                </div>
                <p>
                    <em>{movie.plot}</em>
                </p>
                <p>
                    Starring: <span>{movie.actors}</span>
                </p>
                <p>Directed by: {movie.director}</p>
            </section>
        </div>
    );
}
