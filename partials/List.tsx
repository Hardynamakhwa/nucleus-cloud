import { observer } from "mobx-react-lite";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import store from "../stores";
import { useMemo } from "react";
import { FileType, FolderType } from "../__generated__/schemas/graphql";

export type FolderUnionFile = FolderType | FileType;

interface ListProps {
    data: FolderUnionFile[];
    loading?: boolean;
    refreshing?: boolean;
    onRefresh?(): void;
    onTap?(item: FolderUnionFile): void;
}

function List(props: ListProps) {
    const renderItem = ({ item }: { item: FolderUnionFile }) => {
        return (
            <Pressable onPress={() => props.onTap?.(item)}>
                <Text>{item.name}</Text>
            </Pressable>
        );
    };

    const listKey = useMemo(
        () => `display-${store.ui.display}`,
        [store.ui.display]
    );

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
        />
    );
}

export default observer(List);
