import { useEffect, useState } from "react";
import StarRating from "./components/StarRating/index.jsx";

import { Search, NumResults, NavBar } from "./components/NavBar/index.jsx";
import Main from "./components/Main.jsx";

import Box from "./components/Box/index.jsx";
import MovieList from "./components/MovieList/index.jsx";
import WatchedMovieList from "./components/WatchedMovieList/index.jsx";
import MovieDetails from "./components/MovieDetails/index.jsx";

import Loading from "./components/Loading/index.jsx";
import ErrorMessage from "./components/ErrorMessage/index.jsx";
import WatchedSummary from "./components/WatchedSummary/index.jsx";

import { useMovies } from "./hooks/useMovies.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

export default function App() {
    const [query, setQuery] = useState("");
    const movies = useMovies(query);

    const [selectedID, setSelectedID] = useState("tt1375666");
    const [watchedMovies, setWatchedMovies] = useLocalStorage("watched-movies", []);

    function onSelectMovie(imdbID) {
        setSelectedID(imdbID);
    }

    function onCloseMovie() {
        setSelectedID("");
    }

    function addToWatchedMovies(watchedMovie) {
        setWatchedMovies(watchedMovies => [...watchedMovies, watchedMovie]);
    }

    function removeFromWatchedMovies(id) {
        setWatchedMovies(watchedMovies => watchedMovies.filter(watchedMovie => watchedMovie.imdbID !== id));
    }

    useEffect(
        function () {
            window.localStorage.setItem("watched-movies", JSON.stringify(watchedMovies));
        },
        [watchedMovies],
    );

    return (
        <>
            <NavBar>
                <Search
                    query={query}
                    setQuery={setQuery}
                />
                {query ? <NumResults movies={movies} /> : <></>}
            </NavBar>
            <Main>
                <Box>
                    {" "}
                    {movies.errorMessage ? (
                        <ErrorMessage message={movies.errorMessage} />
                    ) : movies.isLoading ? (
                        <Loading />
                    ) : (
                        <MovieList
                            data={movies.data}
                            onSelectMovie={onSelectMovie}
                        />
                    )}
                </Box>

                <Box>
                    {selectedID ? (
                        <MovieDetails
                            id={selectedID}
                            watchedMovies={watchedMovies}
                            onCloseMovie={onCloseMovie}
                            addToWatchedMovies={addToWatchedMovies}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watchedMovies} />
                            <WatchedMovieList
                                removeFromWatchedMovies={removeFromWatchedMovies}
                                watchedMovies={watchedMovies}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
