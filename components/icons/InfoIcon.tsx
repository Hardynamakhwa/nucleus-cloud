import { ColorValue, PixelRatio } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

export default function InfoIcon({
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
                cx="12"
                cy="12"
                r="10"
            />
            <Line
                x1="12"
                y1="16"
                x2="12"
                y2="12"
            />
            <Line
                x1="12"
                y1="8"
                x2="12.01"
                y2="8"
            />
        </Svg>
    );
}
