import { ColorValue, PixelRatio } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

export default function SearchIcon({
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
            <Circle
                cx="11"
                cy="11"
                r="8"
            />
            <Line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
            />
        </Svg>
    );
}
