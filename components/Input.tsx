import { createContext, PropsWithChildren, useContext } from "react";
import { Text, TextInput, View, TextInputProps } from "react-native";

const FieldContext = createContext<{ errors?: string[] }>({
    errors: [],
});

export function Input(props: {
    onInput?: (text: string) => void;
    type?: TextInputProps["keyboardType"];
    secure?: boolean;
}) {
    const fieldContext = useContext(FieldContext);
    return (
        <View>
            <TextInput
                placeholder="input"
                onChangeText={props.onInput}
                style={{}}
                keyboardType={props.type}
                secureTextEntry={props.secure}
            />
            {fieldContext.errors?.map((err, index) => (
                <View key={index}>
                    <Text style={{ color: "red" }}>{err}</Text>
                </View>
            ))}
        </View>
    );
}

export function Field(props: PropsWithChildren<{ errors?: string[] }>) {
    return (
        <FieldContext.Provider value={{ errors: props.errors }}>
            <View>{props.children}</View>
        </FieldContext.Provider>
    );
}

export function Label(props: PropsWithChildren) {
    return (
        <View>
            <Text>{props.children}</Text>
        </View>
    );
}
