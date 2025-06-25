import { observer } from "mobx-react-lite";
import { FlatList, RefreshControl, View } from "react-native";
import store from "../stores";
import { ReactNode, useMemo } from "react";
import { FileType, FolderType } from "../__generated__/schemas/graphql";
import ListItem from "../components/ListItem";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";
import Text, { TextThemed } from "../components/Text";
import { useTheme } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { Bars2Icon, FolderIcon } from "react-native-heroicons/outline";

export type FolderUnionFile = FolderType | FileType;

interface ListProps {
    data: FolderUnionFile[];
    loading?: boolean;
    refreshing?: boolean;
    onRefresh?(): void;
    onTap?(item: FolderUnionFile): void;
    header?: ReactNode;
}

function List(props: ListProps) {
    const theme = useTheme();
    const renderItem = ({ item }: { item: FolderUnionFile }) => {
        return (
            <ListItem
                title={item.name}
                leading={
                    item.__typename === "FolderType" ?
                        <FolderIcon
                            size={24}
                            color={theme.colors.text}
                        />
                    :   undefined
                }
                onTap={() => props.onTap?.(item)}
                checked={false}
                onChangeCheck={() => {}}
            />
        );
    };

    const listKey = useMemo(() => `display-${store.ui.display}`, []);

    return (
        <FlatList
            style={{ flex: 1 }}
            key={listKey}
            data={props.data}
            renderItem={renderItem}
            refreshControl={
                <RefreshControl
                    refreshing={!!props.refreshing}
                    onRefresh={props.onRefresh}
                />
            }
            keyExtractor={({ id }) => `folder-list-item-${id}`}
            ListHeaderComponent={
                <View className="flex-col gap-y-2">
                    {props.header && (
                        <View className="p-4">{props.header}</View>
                    )}
                    <View className="mb-4 flex-row items-center justify-between px-4">
                        <View className="flex-row items-center gap-x-3">
                            <View
                                style={{ borderColor: theme.colors.border }}
                                className="h-5 w-5 border"
                            />
                            <Menu>
                                <MenuTrigger>
                                    <TextThemed theme={theme}>Name</TextThemed>
                                </MenuTrigger>
                                <MenuOptions
                                    customStyles={{
                                        optionsContainer: {
                                            backgroundColor: theme.colors.card,
                                        },
                                        optionWrapper: {
                                            padding: 16,
                                            paddingVertical: 10,
                                        },
                                        OptionTouchableComponent: RectButton,
                                    }}
                                >
                                    <MenuOption>
                                        <TextThemed theme={theme}>
                                            Name
                                        </TextThemed>
                                    </MenuOption>
                                    <MenuOption>
                                        <TextThemed theme={theme}>
                                            Date created
                                        </TextThemed>
                                    </MenuOption>
                                    <MenuOption>
                                        <TextThemed theme={theme}>
                                            Type
                                        </TextThemed>
                                    </MenuOption>
                                    <MenuOption>
                                        <TextThemed theme={theme}>
                                            Size
                                        </TextThemed>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                        </View>
                        <View>
                            <Menu>
                                <MenuTrigger
                                    customStyles={{
                                        TriggerTouchableComponent: RectButton,
                                    }}
                                >
                                    <Bars2Icon
                                        size={24}
                                        color={theme.colors.text}
                                    />
                                </MenuTrigger>
                                <MenuOptions
                                    customStyles={{
                                        optionsContainer: {
                                            backgroundColor: theme.colors.card,
                                        },
                                        optionWrapper: {
                                            padding: 16,
                                            paddingVertical: 10,
                                        },
                                        OptionTouchableComponent: RectButton,
                                    }}
                                >
                                    <MenuOption>
                                        <TextThemed theme={theme}>
                                            List
                                        </TextThemed>
                                    </MenuOption>
                                    <MenuOption>
                                        <TextThemed theme={theme}>
                                            List compact
                                        </TextThemed>
                                    </MenuOption>
                                    <MenuOption>
                                        <TextThemed theme={theme}>
                                            Grid
                                        </TextThemed>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>
                </View>
            }
        />
    );
}

export default observer(List);
