import "./index.scss";

export function Logo() {
    return (
        <div className="component-logo">
            <span
                className="img"
                role="img">
                🍿
            </span>
            <h1>Use-popcorn</h1>
        </div>
    );
}

export function Search({ query, setQuery }) {
    return (
        <input
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

export function Nav({ children }) {
    return (
        <nav className="component-nav-bar">
            <Logo />
            {children}
        </nav>
    );
}
