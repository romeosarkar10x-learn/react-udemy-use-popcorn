import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./index.scss";
import App from "./App.jsx";

import StarRating from "./components/StarRating/index.jsx";

createRoot(document.getElementById("root")).render(<StrictMode>{<App />}</StrictMode>);
