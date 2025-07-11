import { Pressable, View } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import Text from "./Text";
import React from "react";

export type SnackbarProps = {
    message: string;
    action?: string;
    onAction?: () => void;
    variant?: "default" | "success" | "error" | "warning";
    animationDuration?: number;
};

function Snackbar({
    message,
    action,
    onAction,
    variant = "default",
    animationDuration = 300,
}: SnackbarProps) {
    const variantStyles = {
        default:
            "border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800",
        success:
            "border-green-300 bg-green-200 dark:border-green-700 dark:bg-green-800",
        error: "border-red-300 bg-red-200 dark:border-red-700 dark:bg-red-800",
        warning:
            "border-yellow-300 bg-yellow-200 dark:border-yellow-700 dark:bg-yellow-800",
    };

    return (
        <Animated.View
            testID="snackbar"
            entering={FadeInDown.duration(animationDuration)}
            exiting={FadeOutDown.duration(animationDuration)}
            className={`absolute bottom-6 left-4 right-4 flex-row items-center gap-x-2 rounded-lg border p-4 ${variantStyles[variant]}`}
        >
            <View className="flex-1">
                <Text>{message}</Text>
            </View>
            {action && onAction && (
                <Pressable
                    testID="snackbar-action"
                    onPress={onAction}
                    className="border-b border-dotted border-text px-2"
                    accessibilityRole="button"
                    accessibilityLabel={action}
                >
                    <Text>{action}</Text>
                </Pressable>
            )}
        </Animated.View>
    );
}

export default React.memo(Snackbar);
