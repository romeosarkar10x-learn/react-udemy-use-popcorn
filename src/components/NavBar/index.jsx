import { useRef, useEffect } from "react";
import "./index.scss";

import { Logo } from "./Logo/index.jsx";
import { Settings } from "./Settings/index.jsx";

export function Search({ query, setQuery }) {
    const dom_input = useRef(null);

    useEffect(function () {
        dom_input.current.focus();

        document.querySelector("html").addEventListener("keypress", event => {
            if (event.code === "Slash" && document.activeElement !== dom_input.current) {
                dom_input.current.focus();
                event.preventDefault();
            }
        });
    }, []);

    return (
        <input
            ref={dom_input}
            name="search"
            className="component-search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={e => setQuery(e.target.value)}
        />
    );
}

export function NumResults({ movies }) {
    return (
        <p className="component-num-results">
            Found <strong>{movies.length}</strong> results!
        </p>
    );
}

export function NavBar({ children }) {
    return (
        <nav className="component_nav-bar">
            <Logo />
            {children}
            <Settings />
        </nav>
    );
}
