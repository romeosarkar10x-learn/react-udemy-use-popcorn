import "./index.scss";

export default function ErrorMessage({ message }) {
    return <p className="component-error-message">ERROR: {message}</p>;
}
