import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
import colors from "tailwindcss/colors";

export const darkColors: Theme["colors"] = {
    ...DarkTheme.colors,
    primary: colors.indigo[500],
    background: colors.black,
    text: colors.neutral[100],
    card: colors.neutral[800],
    border: colors.neutral[700],
    notification: colors.red[500],
};

export const lightColors: Theme["colors"] = {
    ...DefaultTheme.colors,
    primary: colors.indigo[500],
    background: colors.white,
    text: colors.neutral[900],
    card: colors.neutral[200],
    border: colors.neutral[300],
    notification: colors.red[500],
};
