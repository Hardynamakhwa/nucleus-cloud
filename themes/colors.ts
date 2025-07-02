import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

// Colors derived from the CSS variables in tailwind.config.js
// to ensure consistency across the application.

const tailwindLight = {
    primary: "rgb(97, 95, 255)",
    background: "rgb(255, 255, 255)",
    card: "rgb(245, 245, 245)", // Mapped from foreground-primary
    text: "rgb(10, 10, 10)",
    border: "rgb(212, 212, 212)",
    notification: "rgb(239, 68, 68)", // Mapped from error
};

const tailwindDark = {
    primary: "rgb(97, 95, 255)",
    background: "rgb(0, 0, 0)",
    card: "rgb(38, 38, 38)", // Mapped from secondary
    text: "rgb(245, 245, 245)",
    border: "rgb(64, 64, 64)",
    notification: "rgb(248, 113, 133)", // Mapped from error
};

export const darkColors: Theme["colors"] = {
    ...DarkTheme.colors,
    ...tailwindDark,
};

export const lightColors: Theme["colors"] = {
    ...DefaultTheme.colors,
    ...tailwindLight,
};
