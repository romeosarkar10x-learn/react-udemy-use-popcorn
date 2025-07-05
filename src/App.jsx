import { OMDB_API_KEY } from "./globals.js";
import { useEffect, useState } from "react";
import StarRating from "./components/StarRating/index.jsx";

import { Logo, Search, NumResults, Nav } from "./components/NavBar/index.jsx";
import Main from "./components/Main.jsx";

import Box from "./components/Box/index.jsx";
import MovieList from "./components/MovieList/index.jsx";
import WatchedMovieList from "./components/WatchedMovieList/index.jsx";
import MovieDetails from "./components/MovieDetails/index.jsx";

import Loading from "./components/Loading/index.jsx";
import ErrorMessage from "./components/ErrorMessage/index.jsx";
import WatchedSummary from "./components/WatchedSummary/index.jsx";

/*
const tempMovieData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
        imdbID: "tt0133093",
        Title: "The Matrix",
        Year: "1999",
        Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
        imdbID: "tt6751668",
        Title: "Parasite",
        Year: "2019",
        Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
];
*/

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        title: "Inception",
        year: "2010",
        poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        title: "Back to the Future",
        year: "1985",
        poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

export default function App() {
    const [query, setQuery] = useState("");
    /*
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    */

    const [movies, setMovies] = useState({ isLoading: false, data: [], id: 0 });
    const [selectedID, setSelectedID] = useState("tt1375666");
    const [watchedMovies, setWatchedMovies] = useState(tempWatchedData);
    const [userRating, setUserRating] = useState(0);

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
            const id = movies.id + 1;

            setMovies(movies => {
                const newMovies = structuredClone(movies);
                newMovies.id++;
                delete newMovies.errorMessage;
                return newMovies;
            });

            if (!query) {
                return;
            }

            async function fetchMovies() {
                setMovies(movies => {
                    const newMovies = structuredClone(movies);
                    newMovies.isLoading = true;
                    return newMovies;
                });

                try {
                    const res = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`);
                    const obj = await res.json();
                    console.log(obj);

                    if (obj.Error) {
                        throw Error(obj.Error);
                    }

                    // setErrorMessage(null);
                    // setMovies(obj.Search);
                    setMovies(movies => {
                        console.log("setMovies", movies.id, id);
                        if (movies.id != id) {
                            return;
                        }

                        const newMovies = structuredClone(movies);
                        newMovies.isLoading = false;
                        newMovies.data = obj.Search;
                        console.log(newMovies);
                        return newMovies;
                    });
                } catch (err) {
                    setMovies(movies => {
                        if (movies.id != id) {
                            return movies;
                        }

                        const newMovies = structuredClone(movies);
                        newMovies.isLoading = false;
                        newMovies.errorMessage = err.message;
                        return newMovies;
                    });
                }
            }

            /*
            if (req) {
                clearTimeout(req.timeout);
            }
                */

            if (movies.timeout) {
                clearTimeout(movies.timeout);
            }

            const timeout = setTimeout(() => {
                /*
                req.fetchMovies();
                req = null;
                */
                fetchMovies();
                setMovies(movies => {
                    const newMovies = structuredClone(movies);
                    delete newMovies.timeout;
                    return newMovies;
                });
            }, 250);

            setMovies(movies => {
                const newMovies = structuredClone(movies);
                newMovies.timeout = timeout;
                return newMovies;
            });
        },
        [query],
    );

    return (
        <>
            <Nav>
                <Search
                    query={query}
                    setQuery={setQuery}
                />
                {query ? <NumResults movies={movies} /> : <></>}
            </Nav>
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
                            userRating={userRating}
                            setUserRating={setUserRating}
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
