import { observer } from "mobx-react-lite";
import {
    FlatList,
    Pressable,
    RefreshControl,
    TextInput,
    View,
} from "react-native";
import store from "../stores";
import { ReactNode, useMemo, useState } from "react";
import { FileType, FolderType } from "../__generated__/schemas/graphql";
import ListItem from "../components/ListItem";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";
import { TextThemed } from "../components/Text";
import { useTheme } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import {
    Bars2Icon,
    FolderIcon,
    XMarkIcon,
} from "react-native-heroicons/outline";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import ListSelectionOptions from "./ListSelectionOptions";

export type FolderUnionFile = FolderType | FileType;

interface ListProps {
    data: FolderUnionFile[];
    loading?: boolean;
    refreshing?: boolean;
    onRefresh?(): void;
    isInserting?: boolean;
    selection?: Set<string>;
    onSelect?(item: string): void;
    onTap?(item: FolderUnionFile): void;
    onSelectionOption?(option: any): void;
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
                checked={props.selection?.has(item.id)}
                onChangeCheck={() => props.onSelect?.(item.id)}
            />
        );
    };

    const listKey = useMemo(() => `display-${store.ui.display}`, []);
    const selectionOptionsTitle = useMemo(() => {
        return (
            props.selection?.size ?
                props.selection.size > 1 ?
                    `${props.selection.size} selected items`
                :   `${
                        props.data.filter(
                            ({ id }) =>
                                id === props.selection?.values().next().value
                        )?.[0]?.name
                    }`
            :   ""
        );
    }, [props.data, props.selection]);

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
                    {!!props.selection?.size && (
                        <ListSelectionOptions
                            title={selectionOptionsTitle}
                            onOptionSelect={(option) => {
                                props.onSelectionOption?.(option);
                            }}
                        />
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
                        <View className="overflow-hidden">
                            {props.isInserting && <NewItemField />}
                        </View>
                    </View>
                </View>
            }
        />
    );
}

function NewItemField() {
    const theme = useTheme();
    const [state, setState] = useState("");
    return (
        <Animated.View
            entering={SlideInUp}
            exiting={SlideOutUp}
            className="flex-row items-center gap-x-4"
        >
            <TextInput
                autoFocus
                value={state}
                onChangeText={(text) => setState(text)}
                style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.medium.fontFamily,
                }}
                className="focus:boder-2 flex-1 border p-2 text-base focus:border-indigo-500"
                multiline={false}
            />
            <Pressable>
                <XMarkIcon
                    size={24}
                    color={theme.colors.text}
                />
            </Pressable>
        </Animated.View>
    );
}

export default observer(List);
