import { PropsWithChildren } from "react";
import { Pressable, Text } from "react-native";

interface ButtonProps {
    onTap?(): void;
}

export function Button(props: PropsWithChildren<ButtonProps>) {
    return (
        <Pressable onPress={props.onTap}>
            <Text>{props.children}</Text>
        </Pressable>
    );
}
