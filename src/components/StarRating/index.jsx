import { useState } from "react";
import "./index.scss";

const textStyle = {};

function ReactiveStar({ id, setRating, setTempRating, resetTempRating, tempRating, rating }) {
    let state = "";

    if (id <= rating) {
        state = "filled";
    }

    if (id <= tempRating) {
        state = "hovered";
    }

    return (
        <button
            className={"star" + (state == "" ? "" : " " + state)}
            onMouseDown={() => (resetTempRating(), setRating())}
            onMouseEnter={() => setTempRating()}
            onMouseLeave={() => resetTempRating()}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        </button>
    );
}

function Star({ id, rating }) {
    const state = id <= rating ? " filled" : "";

    return (
        <button className={"star" + state}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        </button>
    );
}

export default function StarRating({ rating, setRating, maxRating = 5 }) {
    const [tempRating, setTempRating] = useState(0);

    if (setRating) {
        return (
            <div className="component-star-rating">
                <div className="stars">
                    {Array.from({ length: maxRating }, (_, i) => (
                        <ReactiveStar
                            key={i + 1}
                            id={i + 1}
                            rating={rating}
                            tempRating={tempRating}
                            setRating={setRating.bind(null, i + 1)}
                            setTempRating={setTempRating.bind(null, i + 1)}
                            resetTempRating={setTempRating.bind(null, 0)}
                        />
                    ))}
                </div>
                <span
                    className={"rating" + (tempRating ? " hover" : "")}
                    style={textStyle}>
                    {tempRating ? tempRating : rating || "#"} / {maxRating}
                </span>
            </div>
        );
    } else {
        return (
            <div className="component-star-rating">
                <div className="stars">
                    {Array.from({ length: maxRating }, (_, i) => (
                        <Star
                            key={i + 1}
                            id={i + 1}
                            rating={rating}
                        />
                    ))}
                </div>
                <span
                    className={"rating"}
                    style={textStyle}>
                    {rating} / {maxRating}
                </span>
            </div>
        );
    }
}
/*

    const [rating, setRating] = useState(0);
    return (
        <>
            <StarRating
                rating={rating}
                setRating={setRating}
            />
            {rating ? (
                <p>
                    The movie was rated {rating} {rating == 1 ? "star" : "stars"}.
                </p>
            ) : (
                <p>The movie is unrated.</p>
            )}
        </>
    );
*/
