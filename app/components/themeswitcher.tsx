"use client";

import { useState, useEffect } from "react";
import { Switch } from "@heroui/react";

export default function ThemeSwitcher() {
    const [enabled, setEnabled] = useState(false);

    // Sync with system/user preference
    useEffect(() => {
        const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setEnabled(dark || document.documentElement.classList.contains("dark"));
    }, []);

    useEffect(() => {
        if (enabled) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [enabled]);

    return (
        <Switch
            checked={enabled}
            onChange={e => setEnabled(e.target.checked)}
            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none ${
                enabled ? "bg-indigo-600" : "bg-gray-300"
            }`}
            aria-label="Toggle theme"
        >
            <span className="sr-only">Toggle theme</span>
            <span
                className={`absolute left-1 transition-transform ${
                    enabled ? "translate-x-8" : "translate-x-0"
                }`}
            >
                {enabled ? (
                    "MOON"
                ) : (
                    "SUN"
                )}
            </span>
            <span
                className={`inline-block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                    enabled ? "translate-x-8" : "translate-x-0"
                }`}
            />
        </Switch>
    );
}