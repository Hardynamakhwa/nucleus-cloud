import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";
import { TextThemed } from "./Text";
import { useTheme } from "@react-navigation/native";
import { ElementType, ReactNode } from "react";

interface PopupMenuProps {
    title?: string;
    triggerComponent?: ReactNode;
    onOptionSelect?: (value: string) => void;
    items: {
        label: string;
        value: string;
        icon: ElementType;
    }[];
}

export default function PopupMenu(props: PopupMenuProps) {
    const theme = useTheme();
    return (
        <Menu onSelect={(value) => props.onOptionSelect?.(value)}>
            <MenuTrigger
                customStyles={{
                    TriggerTouchableComponent: RectButton,
                }}
            >
                <View className="p-2">
                    <EllipsisHorizontalIcon
                        size={24}
                        color={theme.colors.text}
                    />
                </View>
            </MenuTrigger>
            <MenuOptions
                customStyles={{
                    OptionTouchableComponent: RectButton,
                    optionWrapper: {
                        flexDirection: "row",
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        alignItems: "center",
                        columnGap: 16,
                    },
                    optionsContainer: {
                        backgroundColor: theme.colors.card,
                        borderColor: theme.colors.border,
                        borderWidth: 1,
                        borderRadius: 8,
                    },
                }}
            >
                {props.title && (
                    <View className="border-b border-neutral-700 p-4 py-2.5">
                        <TextThemed
                            variant="h5"
                            theme={theme}
                        >
                            {props.title}
                        </TextThemed>
                    </View>
                )}
                {props.items.map(({ icon: Icon, label, value }) => (
                    <MenuOption
                        value={value}
                        key={value}
                    >
                        <Icon
                            size={20}
                            color={theme.colors.text}
                        />
                        <TextThemed theme={theme}>{label}</TextThemed>
                    </MenuOption>
                ))}
            </MenuOptions>
        </Menu>
    );
}
