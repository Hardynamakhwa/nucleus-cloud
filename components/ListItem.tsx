import { Pressable, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Text from "./Text";
import { ReactElement, ReactNode } from "react";

interface ListItemProps {
    title: string;
    subtitle?: string;
    leading?: ReactNode;
    onTap?(): void;
    disabled?: boolean;
    compact?: boolean;
}

interface ListItemPropsWithCheck extends ListItemProps {
    checked?: boolean;
    onChangeCheck?(value: boolean): void;
}

export default function ListItem(props: ListItemProps): ReactElement;
export default function ListItem(props: ListItemPropsWithCheck): ReactElement;

export default function ListItem(
    props: ListItemProps | ListItemPropsWithCheck
): ReactElement {
    const checked = (props as ListItemPropsWithCheck).checked ?? false;

    return (
        <RectButton
            onPress={props.onTap}
            enabled={!props.disabled}
        >
            <View className="flex-row items-center gap-x-2 px-2">
                {"leading" in props && <View>{props.leading}</View>}
                {"checked" in props && (
                    <Pressable onPress={() => props.onChangeCheck?.(!checked)}>
                        <View className="border-2 border-neutral-600 h-5 w-5" />
                    </Pressable>
                )}
                <View className="flex-col gap-y-2">
                    <Text>{props.title}</Text>
                    {"subtitle" in props && !props.compact && (
                        <Text>{props.subtitle}</Text>
                    )}
                </View>
            </View>
        </RectButton>
    );
}
