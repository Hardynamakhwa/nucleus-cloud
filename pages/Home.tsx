//@ts-ignore
import symmetricDifference from "set.prototype.symmetricdifference";
import { useMutation, useQuery } from "@apollo/client";
import List, { FolderUnionFile } from "../partials/List";
import { useEffect, useState } from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Router";
import { useNavigation, useTheme } from "@react-navigation/native";
import {
    DeleteFolderDocument,
    GetRootDocument,
} from "../__generated__/schemas/graphql";
import UserOverview from "../partials/UserOverview";
import { TouchableOpacity, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { ArrowsUpDownIcon, PlusIcon } from "react-native-heroicons/outline";
import Text from "../components/Text";
import { folderService } from "../services/folder.actions";
import SearchIcon from "../components/icons/SearchIcon";
import UserPlusIcon from "../components/icons/UserPlusIcon";
import useContextMenu from "../hooks/useContextMenu";

type HomeNavigationProps = NativeStackNavigationProp<RootStackParamList>;
const typename = <T extends string>(name: T): T => name;

export default function HomePage() {
    const navigation = useNavigation<HomeNavigationProps>();
    const theme = useTheme();
    const itemContext = useContextMenu();
    const [showCreateInput, setShowCreateInput] = useState(false);
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

    const tapHandler = (item: any) => {
        navigation.push("Folder", {
            id: item.id,
            name: item.name,
        });
    };
    const longTapHandler = (item: any) => {
        itemContext.show(item).then((value) => {
            switch (value) {
                case "manage-permissions":
                    navigation.navigate("ManagePermissions", item);
                    break;
                case "share":
                    navigation.navigate("Share", {
                        resource: item,
                    });
                    break;
            }
        });
    };

    const contents = [
        ...(data?.folder?.getAll ?? []),
        ...(data?.file?.getAll ?? []),
    ] as unknown as FolderUnionFile[];

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <UserOverview />,
            headerRight: ({ tintColor = theme.colors.text }) => (
                <View className="flex-row items-center gap-x-3">
                    <TouchableOpacity
                        className="p-2"
                        onPress={() => navigation.navigate("Search")}
                    >
                        <SearchIcon
                            size={20}
                            color={tintColor}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2">
                        <UserPlusIcon
                            size={20}
                            color={tintColor}
                        />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation, theme.colors.text]);

    return (
        <View style={{ flex: 1 }}>
            <View className="flex-row items-center gap-x-6 p-4">
                <RectButton onPress={() => setShowCreateInput((v) => !v)}>
                    <View className="flex-row items-center gap-x-3 rounded-full border border-text/15 bg-text/15 p-2 px-4">
                        <ArrowsUpDownIcon
                            size={20}
                            color={theme.colors.text}
                        />
                        <Text variant="label">Upload</Text>
                    </View>
                </RectButton>
                <RectButton onPress={() => setShowCreateInput((v) => !v)}>
                    <View className="flex-row items-center gap-x-3 rounded-full border border-neutral-300 p-2 px-4 dark:border-neutral-700">
                        <PlusIcon
                            size={20}
                            color={theme.colors.text}
                        />
                        <Text
                            color="secondary"
                            variant="label"
                        >
                            Create
                        </Text>
                    </View>
                </RectButton>
            </View>
            <List
                data={contents}
                loading={loading}
                refreshing={refreshing}
                onTap={tapHandler}
                onLongTap={longTapHandler}
                onRefresh={onRefresh}
                selection={selected}
                onSelect={(id) =>
                    setSelected((currentState) =>
                        symmetricDifference(currentState, new Set([id]))
                    )
                }
                newEntryInputShown={showCreateInput}
                onRequestStopEditing={() => setShowCreateInput(false)}
                onSubmitEditing={(name) => {
                    folderService.create.next({
                        name,
                    });
                }}
                onSelectionOption={onSelectionOptionHandler}
            />
        </View>
    );
}
