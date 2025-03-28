"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    handleTheme: (value: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        (async () => {
            const savedTheme = (await AsyncStorage.getItem("theme")) as
                | Theme
                | "light";
            if (savedTheme) {
                setTheme(savedTheme);
                AsyncStorage.setItem("theme", savedTheme);
            }
        })();
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        AsyncStorage.setItem("theme", newTheme);
    };

    const handleTheme = (value: Theme) => {
        setTheme(value);
        AsyncStorage.setItem("theme", value);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, handleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};