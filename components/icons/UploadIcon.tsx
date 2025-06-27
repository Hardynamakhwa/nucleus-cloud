import Svg, { Path } from "react-native-svg";

export default function UploadIcon({
    size = 24,
    color = "currentColor",
}: {
    size: number;
    color: string;
}) {
    return (
        <Svg
            height={size}
            width={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={2}
        >
            <Path
                strokeLinecap="round"
                strokeWidth={2}
                strokeLinejoin="round"
                fill="none"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
        </Svg>
    );
}
