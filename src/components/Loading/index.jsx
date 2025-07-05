import { useEffect, useState } from "react";
import "./index.scss";

function Dot({ display }) {
    return <span className={"dot" + (display ? "" : " transparent")}>.</span>;
}

export default function Loading() {
    const [count, setCount] = useState(0);

    useEffect(function () {
        const id = setInterval(() => {
            setCount(count => (count + 1) % 4);
        }, 500);

        return () => clearInterval(id);
    }, []);

    return (
        <p className="component-loading">
            Loading
            <Dot display={count > 0} />
            <Dot display={count > 1} />
            <Dot display={count > 2} />
        </p>
    );
}
