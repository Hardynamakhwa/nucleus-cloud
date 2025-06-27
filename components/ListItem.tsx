import { View } from "react-native";
import { Pressable, RectButton } from "react-native-gesture-handler";
import Text from "./Text";
import { ReactElement, ReactNode } from "react";
// eslint-disable-next-line import/no-named-as-default
import clsx from "clsx";
import { useTheme } from "@react-navigation/native";
import { CheckIcon } from "react-native-heroicons/outline";
import colors from "tailwindcss/colors";

interface ListItemProps {
    title: string;
    subtitle?: string;
    leading?: ReactNode;
    onTap?(): void;
    disabled?: boolean;
    isFirst?: boolean;
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
    const theme = useTheme();

    return (
        <RectButton
            onPress={props.onTap}
            enabled={!props.disabled}
        >
            <View className={clsx("flex-row items-center gap-x-4 px-4")}>
                {"leading" in props && <View>{props.leading}</View>}
                <View
                    style={{ borderColor: theme.colors.border }}
                    className={clsx(
                        "flex-1 flex-row items-center gap-x-4 border-b",
                        {
                            "py-3": !props.compact,
                            "py-1.5": props.compact,
                            "border-t": props.isFirst,
                        }
                    )}
                >
                    {"checked" in props && (
                        <Pressable
                            onPress={() =>
                                props.onChangeCheck?.(!props.checked)
                            }
                        >
                            <View
                                style={{
                                    borderColor:
                                        props.checked ?
                                            theme.colors.primary
                                        :   theme.colors.border,
                                    backgroundColor:
                                        props.checked ?
                                            theme.colors.primary
                                        :   undefined,
                                }}
                                className="h-5 w-5 items-center justify-center border"
                            >
                                {props.checked && (
                                    <CheckIcon
                                        size={14}
                                        color={colors.white}
                                    />
                                )}
                            </View>
                        </Pressable>
                    )}
                    <View className="flex-col gap-y-2">
                        <Text>{props.title}</Text>
                        {"subtitle" in props && !props.compact && (
                            <Text>{props.subtitle}</Text>
                        )}
                    </View>
                </View>
            </View>
        </RectButton>
    );
}
