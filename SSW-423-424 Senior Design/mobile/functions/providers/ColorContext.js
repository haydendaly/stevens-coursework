import React, { createContext, useEffect, useState, useMemo } from "react";
import { AsyncStorage } from "react-native";

const original = {
    primary: "#ffffff",
    primaryText: "#555555",
    highlight: "#000099",
    inactive: "#999999",
    background: "#89F1FF",
    shadow: "#aaa"
}

// Scott's dark mode from the google doc
// need to deal w invisible header words
const dark1 = {
	primary: "#000000",
	primaryText: "#ffffff",
	highlight: "#0f4c75",
	inactive: "#3282b8",
    background: "#1b262c",
    shadow: "#444"
}

// VS Code style
const dark2 = {
	primary: "#252526",
	primaryText: "#ffffff",
	highlight: "#7abada",
	inactive: "#aaaaaa",
    background: "#1e1e1e",
    shadow: "#444"
}

// Babb.io style
const dark3 = {
    primary: "#1c2d3a",
	primaryText: "#ffffff",
	highlight: "#0087f2",
	inactive: "#7f8488",
    background: "#131e2a",
    shadow: "#444"
}

const green = {
    primary: "#ffffff",
    primaryText: "#465448",
    highlight: "#004509",
    inactive: "#687c6b",
    background: "#9fd984",
    shadow: "#444"
}

const yellow = {
    primary: "#ffffff",
    primaryText: "#42291A",
    highlight: "#c49609",
    inactive: "#a38561",
    background: "#fff2cc",
    shadow: "#444"
}

const lavender = {
    primary: "#ffffff",
	primaryText: "#594063",
	highlight: "#9851b1",
	inactive: "#a68caf",
    background: "#f2d8fc",
    shadow: "#444"
}

const pink = {
    primary: "#ffffff",
    primaryText: "#59264b",
    highlight: "#b6408d",
    inactive: "#926787",
    background: "#ffdcf6",
    shadow: "#444"
}

const periwinkle = {
    primary: "#ffffff",
    primaryText: "#0b0b55",
    highlight: "#000099",
    inactive: "#646483",
    background: "#c1c1f5",
    shadow: "#444"
}

const blue = {
    primary: "#ffffff",
    primaryText: "#0d2646",
    highlight: "#1561c0",
    inactive: "#536881",
    background: "#c5eaff",
    shadow: "#444"
}

const colorSchemes = {
    green, blue, yellow, pink, lavender, periwinkle, original, dark2, dark3, dark1
}

export const useColor = () => {
    const [name, setName] = useState("original");
    const [color, setColor] = useState(original);

    useEffect(() => {
        AsyncStorage.getItem('color-scheme', (err, val) => {
            if (val in colorSchemes) {
                setName(val);
            }
        })
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('color-scheme', name)
        setColor(colorSchemes[name]);
     }, [name]);

     return {
         color, 
         setName, 
         colorSchemes,
    }

}

export const color = dark2;
export const ColorContext = createContext("");

export const Color = ({ children }) => {
    const { color, setName, colorSchemes } = useColor();

    const colorProvider = useMemo(() => ({ color, setName, colorSchemes }), [
        color,
        setName,
        colorSchemes
    ]);

    return (
        <ColorContext.Provider value={colorProvider}>
            {children}
        </ColorContext.Provider>
    );
}