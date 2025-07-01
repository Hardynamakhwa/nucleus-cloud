import { ColorValue, PixelRatio } from "react-native";
import Svg, { Polyline } from "react-native-svg";

export default function CheckIcon({
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
            <Polyline points="20 6 9 17 4 12" />
        </Svg>
    );
}
