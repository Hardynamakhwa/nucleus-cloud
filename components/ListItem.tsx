import { useTheme } from "@react-navigation/native";
import { ElementType } from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Text from "./Text";

interface ListItemProps {
    title: string;
    subtitle?: string;
    LeadingIcon?: ElementType;
    onPress?(): void;
    onLongPress?(): void;
}

export default function ListItem({ LeadingIcon, ...props }: ListItemProps) {
    const theme = useTheme();
    return (
        <RectButton
            onPress={props.onPress}
            onLongPress={props.onLongPress}
        >
            <View className="flex-row items-center gap-x-4 px-4 py-2">
                {LeadingIcon && (
                    <LeadingIcon
                        color={theme.colors.text}
                        size={20}
                    />
                )}
                <View className="flex-1">
                    <Text variant="label">{props.title}</Text>
                    {props.subtitle && (
                        <Text variant="subtitle">{props.subtitle}</Text>
                    )}
                </View>
            </View>
        </RectButton>
    );
}
