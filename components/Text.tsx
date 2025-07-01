import { Theme, useTheme } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { Text as RNText, PixelRatio } from "react-native";

interface TextProps {
    color?: "primary" | "background" | "secondary" | "error";
    variant?: keyof typeof variants;
    singleLine?: boolean;
}

const scale = PixelRatio.getFontScale();

export const variants = {
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
        fontFamily: "MontrealMedium",
    },
    h5: {
        fontSize: 18 * scale,
        fontFamily: "MontrealRegular",
    },
    h6: {
        fontSize: 16 * scale,
        fontFamily: "MontrealLight",
    },
    body: {
        fontSize: 16 * scale,
        fontFamily: "MontrealRegular",
    },
    label: {
        fontSize: 16 * scale,
        fontFamily: "MontrealMedium",
    },
    subtitle: {
        fontSize: 14 * scale,
        fontFamily: "MontrealLight",
    },
    caption: {
        fontSize: 12 * scale,
        fontFamily: "MontrealLight",
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
        error: theme.colors.notification,
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
            numberOfLines={props.singleLine ? 1 : undefined}
        >
            {children}
        </RNText>
    );
}

export function TextThemed({
    children,
    theme,
    ...props
}: PropsWithChildren<TextProps & { theme: Theme }>) {
    const colorMap = {
        primary: theme.colors.primary,
        background: theme.colors.background,
        secondary: theme.colors.text,
        error: theme.colors.notification,
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
