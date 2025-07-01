import symmetricDifference from "set.prototype.symmetricdifference";
import { useMutation, useQuery } from "@apollo/client";
import List, { FolderUnionFile } from "../partials/List";
import { useEffect, useState } from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Router";
import { useNavigation } from "@react-navigation/native";
import {
    DeleteFolderDocument,
    GetRootDocument,
} from "../__generated__/schemas/graphql";
import ButtonNew from "../partials/ButtonNew";
import ButtonUpload from "../partials/ButtonUpload";
import UserOverview from "../partials/UserOverview";
import { View } from "react-native";

type HomeNavigationProps = NativeStackNavigationProp<RootStackParamList>;
const typename = <T extends string>(name: T): T => name;

export default function HomePage() {
    const navigation = useNavigation<HomeNavigationProps>();

    const { loading, data, refetch } = useQuery(GetRootDocument);
    const [deleteFolder] = useMutation(DeleteFolderDocument, {
        optimisticResponse() {
            return {
                __typename: typename("Mutation"),
                folder: {
                    __typename: typename("FolderMutations"),
                    delete: {
                        __typename: typename("DeleteResponse"),
                        success: true,
                        message: "deleted successfully",
                    },
                },
            };
        },
        update(cache, { data }, { variables }) {
            const deleteSuccess = data?.folder.delete.success;
            if (!deleteSuccess) return;

            const existing = cache.readQuery({
                query: GetRootDocument,
            });

            cache.writeQuery({
                query: GetRootDocument,
                data: {
                    ...existing!,
                    folder: {
                        getAll:
                            existing?.folder.getAll.filter(
                                ({ id }) => id !== variables?.id
                            ) ?? [],
                    },
                },
            });
        },
    });

    const onSelectionOptionHandler = (option: any) => {
        switch (option) {
            case "delete":
                selected.forEach((id) => {
                    setSelected((curr) => {
                        const newSet = new Set(curr);
                        newSet.delete(id);
                        return newSet;
                    });
                    deleteFolder({
                        variables: {
                            id,
                        },
                        onError() {
                            setSelected((curr) => new Set([...curr, id]));
                        },
                    });
                });
                break;
        }
    };

    const [refreshing, setRefreshing] = useState(false);
    const [selected, setSelected] = useState(new Set<string>());

    const onRefresh = () => {
        setRefreshing(true);
        refetch().finally(() => setRefreshing(false));
    };

    const onTapHandler = (item: any) => {
        navigation.push("Folder", {
            id: item.id,
            name: item.name,
        });
    };

    const contents = [
        ...(data?.folder?.getAll ?? []),
        ...(data?.file?.getAll ?? []),
    ] as unknown as FolderUnionFile[];

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <UserOverview />,
        });
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <View className="flex-row items-center gap-x-6 p-4">
                <ButtonUpload />
                <ButtonNew />
            </View>
            <List
                data={contents}
                loading={loading}
                refreshing={refreshing}
                onTap={onTapHandler}
                onRefresh={onRefresh}
                selection={selected}
                onSelect={(id) =>
                    setSelected((currentState) =>
                        symmetricDifference(currentState, new Set([id]))
                    )
                }
                onSelectionOption={onSelectionOptionHandler}
            />
        </View>
    );
}
