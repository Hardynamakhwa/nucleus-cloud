import { useTheme } from "@react-navigation/native";
import { View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import CheckIcon from "./icons/CheckIcon";

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
                style={{
                    borderColor:
                        props.checked ?
                            theme.colors.primary
                        :   theme.colors.border,
                    backgroundColor:
                        props.checked ? theme.colors.primary : undefined,
                }}
                className="h-5 w-5 items-center justify-center rounded-sm border"
            >
                {props.checked && (
                    <CheckIcon
                        size={16}
                        color={theme.colors.background}
                    />
                )}
            </View>
        </Pressable>
    );
}
