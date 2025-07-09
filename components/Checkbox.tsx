import { useTheme } from "@react-navigation/native";
import { View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import CheckIcon from "./icons/CheckIcon";
import clsx from "clsx";

interface CheckboxProps {
    checked?: boolean;
    onChange?(value: boolean): void;
}

export default function Checkbox(props: CheckboxProps) {
    const theme = useTheme();
    return (
        <Pressable
            onPress={() => props.onChange?.(!props.checked)}
            className="p-2"
        >
            <View
                className={clsx([
                    "size-5 items-center justify-center rounded border",
                    "border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800",
                    props.checked
                        && "border-transparent bg-neutral-800 dark:border-transparent dark:bg-neutral-600",
                ])}
            >
                {props.checked && (
                    <CheckIcon
                        size={16}
                        color={theme.colors.text}
                    />
                )}
            </View>
        </Pressable>
    );
}
