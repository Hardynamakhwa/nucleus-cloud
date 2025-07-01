import { ColorValue, PixelRatio } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";

export default function UserPlusIcon({
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
            <Path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <Circle
                cx="8.5"
                cy="7"
                r="4"
            />
            <Line
                x1="20"
                y1="8"
                x2="20"
                y2="14"
            />
            <Line
                x1="23"
                y1="11"
                x2="17"
                y2="11"
            />
        </Svg>
    );
}
