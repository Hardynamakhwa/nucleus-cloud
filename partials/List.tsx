import { observer } from "mobx-react-lite";
import {
    FlatList,
    RefreshControl,
    View,
    ActivityIndicator,
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
                        <ListHeader />
                        <View className="overflow-hidden">
                            {props.newEntryInputShown && (
                                <NewEntryInput
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
