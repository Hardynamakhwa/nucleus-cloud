import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
import { darkColors, lightColors } from "./colors";
import { fonts } from "./fonts";

export const darkTheme: Theme = {
    ...DarkTheme,
    fonts,
    colors: darkColors,
};

export const lightTheme: Theme = {
    ...DefaultTheme,
    fonts,
    colors: lightColors,
};
