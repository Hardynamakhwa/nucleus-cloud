import { DefaultTheme, Theme } from "@react-navigation/native";

export const fonts: Theme["fonts"] = {
    ...DefaultTheme.fonts,
    medium: {
        fontFamily: "MontrealMedium",
        fontWeight: "500",
    },
    regular: {
        fontFamily: "MontrealRegular",
        fontWeight: "400",
    },
};
