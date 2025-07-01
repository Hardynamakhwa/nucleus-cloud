import { observer } from "mobx-react-lite";
import {
    FlatList,
    RefreshControl,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import store from "../stores";
import { ReactNode, useMemo, useState } from "react";
import { FileType, FolderType } from "../__generated__/schemas/graphql";
import ListItem from "./ListItem";
import Text, { TextThemed } from "../components/Text";
import { useTheme } from "@react-navigation/native";
import {
    Bars2Icon,
    FolderIcon,
    XMarkIcon,
} from "react-native-heroicons/outline";
import PopupMenu from "../components/PopupMenu";

export type FolderUnionFile = FolderType | FileType;

interface ListProps {
    data: FolderUnionFile[];
    loading?: boolean;
    refreshing?: boolean;
    onRefresh?(): void;
    newEntryInputShown?: boolean;
    selection?: Set<string>;
    onSelect?(item: string): void;
    onTap?(item: FolderUnionFile): void;
    onSelectionOption?(option: any): void;
    header?: ReactNode;
    editing?: string;
    onRequestStopEditing?(): void;
    onSubmitEditing?(value: string): void;
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
                editing={props.editing === item.id}
                onSubmitEditing={props.onSubmitEditing}
                onRequestStopEditing={props.onRequestStopEditing}
                onTap={() => props.onTap?.(item)}
                checked={props.selection?.has(item.id)}
                onChangeCheck={() => props.onSelect?.(item.id)}
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
            ListEmptyComponent={
                <View className="mt-6 items-center justify-center p-4 opacity-50">
                    <Text variant="h4">No contents :(</Text>
                </View>
            }
            ListHeaderComponent={
                <View className="flex-col gap-y-2">
                    {props.header && (
                        <View className="p-4">{props.header}</View>
                    )}
                    <>
                        <View className="mb-4 flex-row items-center justify-between px-4">
                            <View className="flex-row items-center gap-x-3">
                                <View
                                    style={{
                                        borderColor: theme.colors.border,
                                    }}
                                    className="h-5 w-5 border"
                                />
                                <TextThemed theme={theme}>Name</TextThemed>
                            </View>
                            <View>
                                <PopupMenu
                                    items={[
                                        {
                                            label: "Sort by name",
                                            value: "sort-name",
                                            icon: Bars2Icon,
                                        },
                                        {
                                            label: "Sort by date",
                                            value: "sort-date",
                                            icon: Bars2Icon,
                                        },
                                    ]}
                                >
                                    <Bars2Icon
                                        size={24}
                                        color={theme.colors.text}
                                    />
                                </PopupMenu>
                            </View>
                        </View>
                        <View className="overflow-hidden">
                            {props.newEntryInputShown && (
                                <Input
                                    onSubmit={props.onSubmitEditing}
                                    onRequestStopEditing={
                                        props.onRequestStopEditing
                                    }
                                />
                            )}
                        </View>
                    </>
                </View>
            }
        />
    );
}

function Input(props: {
    onSubmit?(value: string): void;
    onRequestStopEditing?(): void;
    value?: string;
}): ReactNode {
    const theme = useTheme();
    const [inputValue, setInputValue] = useState(props.value || "");
    return (
        <View className="flex-row items-center gap-x-4 p-2 px-4">
            <TextInput
                value={inputValue}
                onChangeText={setInputValue}
                className="flex-1 p-2 py-1.5 text-lg color-text focus:border-2 focus:border-primary"
                numberOfLines={1}
                multiline={false}
                autoFocus
                autoCapitalize="none"
                selectTextOnFocus
                placeholder="New folder name"
                placeholderTextColor={theme.colors.border}
                submitBehavior="blurAndSubmit"
                onBlur={props.onRequestStopEditing}
                onSubmitEditing={() => {
                    props.onSubmit?.(inputValue);
                    setInputValue("");
                }}
            />
            <TouchableOpacity>
                <XMarkIcon
                    size={24}
                    color={theme.colors.text}
                />
            </TouchableOpacity>
        </View>
    );
}
export default observer(List);
