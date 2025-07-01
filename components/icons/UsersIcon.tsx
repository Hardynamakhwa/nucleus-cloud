import { ColorValue, PixelRatio } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

export default function UsersIcon({
    color,
    size = 24,
}: {
    color: ColorValue;
    size?: number;
}) {
    return (
        <Svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            stroke={color}
            height={size * PixelRatio.getFontScale()}
            width={size * PixelRatio.getFontScale()}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <Circle
                cx="9"
                cy="7"
                r="4"
            />
            <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </Svg>
    );
}
