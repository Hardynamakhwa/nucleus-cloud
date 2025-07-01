import { ColorValue, PixelRatio } from "react-native";
import Svg, { Line, Path, Polyline } from "react-native-svg";

export default function DownloadIcon({
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
            <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <Polyline points="7 10 12 15 17 10" />
            <Line
                x1="12"
                y1="15"
                x2="12"
                y2="3"
            />
        </Svg>
    );
}
