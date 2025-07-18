import { useState, useEffect } from "react";

export function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(function () {
        if (!window.localStorage.getItem(key)) {
            return defaultValue;
        }

        return JSON.parse(window.localStorage.getItem(key));
    });

    useEffect(
        function () {
            window.localStorage.setItem(key, JSON.stringify(value));
        },
        [key, value],
    );

    return [value, setValue];
}
