import { TextInput, View } from "react-native";
import { Pressable, RectButton } from "react-native-gesture-handler";
import Text from "../components/Text";
import { ReactElement, ReactNode, useState } from "react";
// eslint-disable-next-line import/no-named-as-default
import clsx from "clsx";
import Checkbox from "../components/Checkbox";
import { XCircleIcon } from "react-native-heroicons/outline";
import { useTheme } from "@react-navigation/native";

interface ListItemProps {
    title: string;
    subtitle?: string;
    leading?: ReactNode;
    onTap?(): void;
    onLongTap?(): void;
    disabled?: boolean;
    isFirst?: boolean;
    compact?: boolean;
    editing?: boolean;
    onSubmitEditing?(text: string): void;
    onRequestStopEditing?(): void;
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
    return (
        <RectButton
            onPress={props.onTap}
            onLongPress={props.onLongTap}
            enabled={!props.disabled}
        >
            <View className={clsx("flex-row items-center gap-x-4 px-2 pl-4")}>
                {"checked" in props && (
                    <Checkbox
                        checked={props.checked}
                        onChange={(value) => props.onChangeCheck?.(value)}
                    />
                )}
                <View
                    className={clsx(
                        "flex-1 flex-row items-center gap-x-4 border-b border-l-4 px-2",
                        {
                            "py-3": !props.compact,
                            "py-1.5": props.compact,
                            "border-t": props.isFirst,
                        },
                        (props as ListItemPropsWithCheck).checked ?
                            "border-b-transparent border-l-neutral-500 bg-neutral-500/50"
                        :   "border-b-neutral-800 border-l-transparent"
                    )}
                >
                    {"leading" in props && <View>{props.leading}</View>}
                    {props.editing ?
                        <View className="flex-1">
                            <Input
                                value={props.title}
                                onSubmit={props.onSubmitEditing}
                                onDismiss={props.onRequestStopEditing}
                            />
                        </View>
                    :   <View className="flex-col gap-y-2">
                            <Text>{props.title}</Text>
                            {"subtitle" in props && !props.compact && (
                                <Text>{props.subtitle}</Text>
                            )}
                        </View>
                    }
                </View>
            </View>
        </RectButton>
    );
}

interface InputProps {
    value: string;
    onSubmit?(value: string): void;
    onDismiss?(): void;
}
function Input(props: InputProps) {
    const theme = useTheme();
    const [state, setState] = useState(props.value);
    return (
        <View className="-ml-2.5 flex-row items-center gap-x-4">
            <TextInput
                value={state}
                onChangeText={(value) => setState(value)}
                onSubmitEditing={(e) => props.onSubmit?.(e.nativeEvent.text)}
                onBlur={props.onDismiss}
                selectTextOnFocus
                autoFocus
                multiline={false}
                submitBehavior="blurAndSubmit"
                numberOfLines={1}
                autoCapitalize="none"
                className="flex-1 border px-2.5 py-1.5 font-[MontrealRegular] text-base text-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100"
            />
            <Pressable onPress={props.onDismiss}>
                <XCircleIcon
                    size={22}
                    color={theme.colors.text}
                />
            </Pressable>
        </View>
    );
}
