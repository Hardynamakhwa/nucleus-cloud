import { useTheme } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { Text as RNText, PixelRatio } from "react-native";

interface TextProps {
    color?: "primary" | "background" | "secondary";
    variant?: keyof typeof variants;
}

const scale = PixelRatio.getFontScale();

const variants = {
    h1: {
        fontSize: 32 * scale,
        fontFamily: "RoobertHeavy",
    },
    h2: {
        fontSize: 28 * scale,
        fontFamily: "RoobertBold",
    },
    h3: {
        fontSize: 24 * scale,
        fontFamily: "RoobertSemiBold",
    },
    h4: {
        fontSize: 20 * scale,
        fontFamily: "RoobertMedium",
    },
    h5: {
        fontSize: 18 * scale,
        fontFamily: "RoobertRegular",
    },
    h6: {
        fontSize: 16 * scale,
        fontFamily: "RoobertLight",
    },
    body: {
        fontSize: 16 * scale,
        fontFamily: "MontrealRegular",
    },
};

const defaults: { color: TextProps["color"]; variant: TextProps["variant"] } = {
    color: "secondary",
    variant: "body",
} as const;

export default function Text({
    children,
    ...props
}: PropsWithChildren<TextProps>) {
    const theme = useTheme();

    const colorMap = {
        primary: theme.colors.primary,
        background: theme.colors.background,
        secondary: theme.colors.text,
    };

    const variant =
        props.variant
        || (defaults.variant as NonNullable<TextProps["variant"]>);
    const variantStyle = variants[variant];

    return (
        <RNText
            style={{
                color: colorMap[
                    (props.color ?? defaults.color) as keyof typeof colorMap
                ],
                fontSize: variantStyle.fontSize,
                fontFamily: variantStyle.fontFamily,
            }}
        >
            {children}
        </RNText>
    );
}
