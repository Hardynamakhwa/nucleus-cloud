import { useTheme } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { Text as RNText } from "react-native";

interface TextProps {
    color?: "primary" | "backgroud" | "secondary";
}

export default function Text({
    children,
    ...props
}: PropsWithChildren<TextProps>) {
    const theme = useTheme();

    const colorMap = {
        primary: theme.colors.primary,
        backgroud: theme.colors.background,
        secondary: theme.colors.text,
    };

    return (
        <RNText
            style={{
                color: colorMap[props.color || "secondary"],
                fontFamily: theme.fonts.regular.fontFamily,
            }}
            className="text-base"
        >
            {children}
        </RNText>
    );
}
