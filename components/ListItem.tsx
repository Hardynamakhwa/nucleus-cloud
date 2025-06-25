import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Text from "./Text";
import { ReactElement, ReactNode } from "react";
// eslint-disable-next-line import/no-named-as-default
import clsx from "clsx";
import { useTheme } from "@react-navigation/native";

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
    const checked = (props as ListItemPropsWithCheck).checked ?? false;

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
                        <View
                            style={{ borderColor: theme.colors.border }}
                            className="h-5 w-5 border"
                        />
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
