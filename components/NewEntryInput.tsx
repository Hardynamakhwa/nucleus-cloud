import { useTheme } from "@react-navigation/native";
import { ReactNode, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";

export default function NewEntryInput(props: {
    onSubmit?(value: string): void;
    onRequestStopEditing?(): void;
    value?: string;
}): ReactNode {
    const theme = useTheme();
    const [inputValue, setInputValue] = useState(props.value || "");
    return (
        <View className="flex-row items-center gap-x-4 p-2 px-4">
            <TextInput
                value={inputValue}
                onChangeText={setInputValue}
                className="flex-1 p-2 py-1.5 text-lg color-text focus:border focus:border-text"
                numberOfLines={1}
                multiline={false}
                autoFocus
                autoCapitalize="none"
                selectTextOnFocus
                placeholder="New folder name"
                placeholderTextColor={theme.colors.border}
                submitBehavior="blurAndSubmit"
                onBlur={props.onRequestStopEditing}
                onSubmitEditing={() => {
                    props.onSubmit?.(inputValue);
                    setInputValue("");
                }}
            />
            <TouchableOpacity onPress={props.onRequestStopEditing}>
                <XMarkIcon
                    size={24}
                    color={theme.colors.text}
                />
            </TouchableOpacity>
        </View>
    );
}
