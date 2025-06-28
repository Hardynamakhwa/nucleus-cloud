import { useTheme } from "@react-navigation/native";
import { Image } from "react-native";

export default function AppLogo() {
    const theme = useTheme();
    const image = require("../assets/splash-icon-dark.png");
    return (
        <Image
            source={image}
            height={42}
            className="h-8 w-8"
            width={42}
        />
    );
}
