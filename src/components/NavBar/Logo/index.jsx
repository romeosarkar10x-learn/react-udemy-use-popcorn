import { LogoIcon } from "./LogoIcon/index.jsx";
import "./index.scss";

export function Logo() {
    return (
        <div className="logo">
            <LogoIcon />
            <h1>Use-popcorn</h1>
        </div>
    );
}
