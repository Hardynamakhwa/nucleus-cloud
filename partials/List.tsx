import { observer } from "mobx-react-lite";
import {
    FlatList,
    RefreshControl,
    View,
    ActivityIndicator,
    Text as RNText,
} from "react-native";
import store from "../stores";
import { ReactNode, useMemo } from "react";
import { FileType, FolderType } from "../__generated__/schemas/graphql";
import ListItem from "./ListItem";
import Text from "../components/Text";
import { useTheme } from "@react-navigation/native";
import { FolderIcon } from "react-native-heroicons/outline";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import NewEntryInput from "../components/NewEntryInput";
import ListHeader from "../components/ListHeader";

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
    onLongTap?(item: FolderUnionFile): void;
    onSelectionOption?(option: any): void;
    header?: ReactNode;
    renaming?: string | null;
    onRequestRenameDismiss?(): void;
    onSubmitRename?(prams: { id: string; value: string }): void;
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
                editing={props.renaming === item.id}
                onSubmitEditing={(value) =>
                    props.onSubmitRename?.({ id: item.id, value })
                }
                onRequestStopEditing={props.onRequestRenameDismiss}
                onTap={() => props.onTap?.(item)}
                onLongTap={() => props.onLongTap?.(item)}
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
                !props.loading && !props.newEntryInputShown ?
                    <View className="my-auto mt-6 flex-1 items-center justify-center p-4 opacity-85">
                        <RNText className="text-center">
                            <Text>
                                <View className="border-b border-transparent">
                                    <Text>This folder is empty</Text>
                                </View>{" "}
                                <View className="border-b border-dotted border-text">
                                    <Text variant="label">upload</Text>
                                </View>{" "}
                                <View className="border-b border-transparent">
                                    <Text>or</Text>
                                </View>{" "}
                                <View className="border-b border-dotted border-text">
                                    <Text variant="label">
                                        create a new folder
                                    </Text>
                                </View>
                            </Text>
                        </RNText>
                    </View>
                :   null
            }
            ListHeaderComponent={
                <View className="flex-col gap-y-2">
                    {props.header && (
                        <View className="p-4">{props.header}</View>
                    )}
                    <>
                        {!props.loading && props.data.length ?
                            <ListHeader />
                        :   null}
                        <View className="overflow-hidden">
                            {props.newEntryInputShown && (
                                <NewEntryInput
                                    onSubmit={props.onSubmitEditing}
                                    value="Untitled folder"
                                    onRequestStopEditing={
                                        props.onRequestStopEditing
                                    }
                                />
                            )}
                        </View>
                    </>
                </View>
            }
            ListFooterComponent={
                props.loading ?
                    <Animated.View
                        entering={FadeIn}
                        exiting={FadeOut}
                        className="items-center justify-center p-4"
                    >
                        <ActivityIndicator
                            size="large"
                            color={theme.colors.primary}
                        />
                    </Animated.View>
                :   undefined
            }
        />
    );
}

export default observer(List);
