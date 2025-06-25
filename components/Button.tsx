import { PropsWithChildren } from "react";
import { ActivityIndicator, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Text from "./Text";
import { useTheme } from "@react-navigation/native";
import colors from "tailwindcss/colors";
import Animated, { LinearTransition } from "react-native-reanimated";

interface ButtonProps {
    onTap?(): void;
    loading?: boolean;
    disabled?: boolean;
}

export function Button(props: PropsWithChildren<ButtonProps>) {
    const theme = useTheme();

    return (
        <RectButton
            onPress={props.onTap}
            style={{ alignSelf: "flex-start" }}
            enabled={!props.disabled}
        >
            <Animated.View
                className="flex-row items-center gap-x-4 px-4 py-3"
                style={{
                    backgroundColor: theme.colors.primary,
                    overflow: "hidden",
                }}
                layout={LinearTransition}
            >
                {props.loading && (
                    <ActivityIndicator
                        size="small"
                        color={colors.white}
                    />
                )}
                <Text variant="h5">{props.children}</Text>
            </Animated.View>
        </RectButton>
    );
}
