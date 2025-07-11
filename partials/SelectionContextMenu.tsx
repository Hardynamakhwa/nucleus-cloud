import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";
import Checkbox from "../components/Checkbox";
import Text from "../components/Text";
import { StyleSheet, View } from "react-native";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";
import { useTheme } from "@react-navigation/native";

export default function SelectionContextMenu({
    selected,
}: {
    selected: Set<string>;
}) {
    const theme = useTheme();
    const hasMore = selected.size > 1;
    return (
        <Menu>
            <MenuTrigger>
                <View className="p-2">
                    <EllipsisHorizontalIcon
                        size={24}
                        color={theme.colors.text}
                    />
                </View>
            </MenuTrigger>
            <MenuOptions
                customStyles={{
                    optionsContainer: {
                        backgroundColor: theme.colors.card,
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: theme.colors.border,
                        borderRadius: 8,
                    },
                    optionWrapper: {
                        flexDirection: "row",
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        columnGap: 16,
                    },
                }}
            >
                <Option
                    label="Star"
                    value="star"
                    checked={false}
                    onChangeCheck={() => {}}
                />
                <View className="border-b border-border" />
                {!hasMore && (
                    <Option
                        label="Download"
                        value="download"
                    />
                )}
                <Option
                    label="Available Offline"
                    value="make-available-offline"
                />
                {!hasMore && (
                    <>
                        <Option
                            label="Share"
                            value="share"
                        />
                        <Option
                            label="Get Link"
                            value="get-link"
                        />
                        <Option
                            label="Manage Permissions"
                            value="manage-permissions"
                        />
                    </>
                )}
                <View className="border-b border-border" />
                {!hasMore && (
                    <Option
                        label="Rename"
                        value="rename"
                    />
                )}
                <Option
                    label="Move To"
                    value="move"
                />
                <Option
                    label="Copy To"
                    value="copy"
                />
                <Option
                    label="Move To Trash"
                    value="delete"
                />
            </MenuOptions>
        </Menu>
    );
}

interface OptionProps {
    label: string;
    value: string;
}

function Option({
    label,
    value,
    ...props
}:
    | OptionProps
    | (OptionProps & {
          checked: boolean;
          onChangeCheck(value: boolean): void;
      })) {
    return (
        <MenuOption value={value}>
            {"checked" in props && (
                <Checkbox
                    checked={props.checked}
                    onChange={props.onChangeCheck}
                />
            )}
            <Text variant="label">{label}</Text>
        </MenuOption>
    );
}
