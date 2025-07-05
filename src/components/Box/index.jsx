import { useState } from "react";
import BoxToggleButton from "../BoxToggleButton.jsx";
import "./index.scss";

export default function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="component-box">
            <BoxToggleButton
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            {isOpen && children}
        </div>
    );
}
