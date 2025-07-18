import { OMDB_API_KEY } from "../globals";
import { useState, useEffect } from "react";

export function useMovies(query) {
    const [movies, setMovies] = useState({ isLoading: false, data: [], id: 0 });

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

                    setMovies(movies => {
                        if (movies.id != id) {
                            return movies;
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

            if (movies.timeout) {
                clearTimeout(movies.timeout);
            }

            const timeout = setTimeout(() => {
                fetchMovies();
                setMovies(movies => {
                    const newMovies = structuredClone(movies);
                    delete newMovies.timeout;
                    return newMovies;
                });
            }, 500);

            setMovies(movies => {
                const newMovies = structuredClone(movies);
                newMovies.timeout = timeout;
                return newMovies;
            });
        },
        [query],
    );

    return movies;
}
