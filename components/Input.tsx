import { createContext, PropsWithChildren, useContext } from "react";
import {
    TextInput,
    View,
    TextInputProps,
    NativeSyntheticEvent,
    TextInputChangeEventData,
} from "react-native";
import Text from "./Text";
import { useTheme } from "@react-navigation/native";

const FieldContext = createContext<{ errors?: string[] }>({
    errors: [],
});

export function Input(props: {
    value?: string;
    onInput?: (text: string) => void;
    onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    type?: TextInputProps["keyboardType"];
    secure?: boolean;
}) {
    const theme = useTheme();
    const fieldContext = useContext(FieldContext);
    return (
        <View className="my-1">
            <TextInput
                value={props.value}
                onChange={props.onChange}
                onChangeText={props.onInput}
                style={{
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                }}
                cursorColor={theme.colors.primary}
                className="border p-2.5 text-base focus:border-2"
                multiline={false}
                keyboardType={props.type}
                secureTextEntry={props.secure}
            />
            {fieldContext.errors?.map((err, index) => (
                <View key={index}>
                    <Text color="error">{err}</Text>
                </View>
            ))}
        </View>
    );
}

export function Field(props: PropsWithChildren<{ errors?: string[] }>) {
    return (
        <FieldContext.Provider value={{ errors: props.errors }}>
            <View className="flex-col p-4">{props.children}</View>
        </FieldContext.Provider>
    );
}

export function Label(props: PropsWithChildren) {
    return (
        <View>
            <Text
                variant="h5"
                singleLine
            >
                {props.children}
            </Text>
        </View>
    );
}
