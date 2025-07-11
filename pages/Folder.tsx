import { useMutation, useQuery } from "@apollo/client";
import {
    RouteProp,
    useNavigation,
    useRoute,
    useTheme,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ToastAndroid, TouchableOpacity, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import {
    ArrowsUpDownIcon,
    ChevronDownIcon,
    EllipsisVerticalIcon,
    PlusIcon,
} from "react-native-heroicons/outline";
// @ts-ignore
import symmetricDifference from "set.prototype.symmetricdifference";
import {
    CreateFolderDocument,
    DeleteFolderDocument,
    GetFolderDocument,
    RenameFolderDocument,
} from "../__generated__/schemas/graphql";
import Text from "../components/Text";
import useBackHandler from "../hooks/useBackHandler";
import List, { FolderUnionFile } from "../partials/List";
import { RootStackParamList } from "../Router";
import { folderService } from "../services/folder.actions";
import UserPlusIcon from "../components/icons/UserPlusIcon";
import SearchIcon from "../components/icons/SearchIcon";
import useContextMenu from "../hooks/useContextMenu";
import useFeedback from "../hooks/useFeedback";
import SelectionContextMenu from "../partials/SelectionContextMenu";
import Breadcrumb from "../components/Breadcrumb";

type FolderRouteProp = RouteProp<RootStackParamList, "Folder">;
type FolderNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Folder"
>;

const typename = <T extends string>(name: T): T => name;

export default function FolderPage() {
    // State declarations
    const itemContext = useContextMenu();
    const { snackbar } = useFeedback();

    const [refreshInProgress, setRefreshInProgress] = useState(false);
    const [selected, setSelected] = useState(new Set<string>());
    const [showCreateInput, setShowCreateInput] = useState(false);
    const [renaming, setRenaming] = useState<string | null>(null);

    // Navigation and route hooks
    const theme = useTheme();
    const route = useRoute<FolderRouteProp>();
    const navigation = useNavigation<FolderNavigationProp>();

    // Data fetching
    const { loading, data, refetch } = useQuery(GetFolderDocument, {
        variables: { id: route.params.id },
    });

    const [createNewFolder] = useMutation(CreateFolderDocument, {
        optimisticResponse(vars) {
            const timestamp = new Date().toISOString();
            return {
                __typename: typename("Mutation"),
                folder: {
                    __typename: typename("FolderMutations"),
                    create: {
                        __typename: typename("FolderType"),
                        id: "temp-id-" + Math.random().toString(36).slice(2),
                        name: vars.name,
                        files: [],
                        folders: [],
                        createdAt: timestamp,
                        updatedAt: timestamp,
                    },
                },
            };
        },
        update(cache, { data }, vars) {
            const updated = data?.folder.create;
            if (!updated) return;

            const existing = cache.readQuery({
                query: GetFolderDocument,
                variables: {
                    id: vars.variables?.parentId,
                },
            });
            if (!existing?.folder?.get) return;
            cache.writeQuery({
                query: GetFolderDocument,
                variables: {
                    id: route.params.id,
                },
                data: {
                    ...existing,
                    folder: {
                        ...existing.folder,
                        get: {
                            ...existing.folder.get,
                            folders: [
                                ...(existing.folder.get?.folders ?? []),
                                updated,
                            ],
                        },
                    },
                },
            });
        },
        onCompleted(data) {
            const folder = data.folder.create;
            snackbar.show(
                `Successfully created ${folder.name} in ${route.params.name}`,
                {
                    variant: "success",
                },
                4000
            );
            // navigation.push("Folder", { id: folder.id, name: folder.name });
        },
    });

    const [renameFolderMutaion] = useMutation(RenameFolderDocument, {
        optimisticResponse(vars) {
            return {
                __typename: typename("Mutation"),
                folder: {
                    __typename: typename("FolderMutations"),
                    update: {
                        __typename: typename("FolderType"),
                        id: "temp-id-" + Math.random().toString(36).slice(2),
                        name: vars.input.name!,
                        updatedAt: new Date().toISOString(),
                    },
                },
            };
        },
        update(cache, { data }) {
            const updated = data?.folder.update;
            if (!updated) return null;

            cache.modify({
                id: cache.identify({
                    __typename: "FolderType",
                    id: updated.id,
                }),
                fields: {
                    name: () => updated.name,
                    updatedAt: () => updated.updatedAt,
                },
            });
        },
        onCompleted(data) {
            snackbar.show(
                `Successfully renamed to ${data.folder.update.name}`,
                {
                    variant: "success",
                },
                4000
            );
        },
    });

    const [deleteFolderMutation] = useMutation(DeleteFolderDocument, {
        optimisticResponse() {
            return {
                __typename: typename("Mutation"),
                folder: {
                    __typename: typename("FolderMutations"),
                    delete: {
                        __typename: typename("DeleteResponse"),
                        success: true,
                        message: "Successfully deleted",
                    },
                },
            };
        },
        update(cache, { data }, { variables }) {
            const deleteSuccess = data?.folder.delete.success;
            if (!deleteSuccess) return;

            const existing = cache.readQuery({
                query: GetFolderDocument,
                variables: {
                    id: route.params.id,
                },
            });

            if (!existing?.folder?.get) return;

            cache.writeQuery({
                query: GetFolderDocument,
                variables: {
                    id: route.params.id,
                },
                data: {
                    ...existing,
                    folder: {
                        ...existing.folder,
                        get: {
                            ...existing?.folder.get,
                            folders:
                                existing?.folder.get?.folders.filter(
                                    ({ id }) => id !== variables?.id
                                ) ?? [],
                        },
                    },
                },
            });
        },
        onCompleted(data) {
            snackbar.show(
                data.folder.delete.message,
                {
                    variant: "success",
                },
                4000
            );
        },
    });

    // Memoized values
    const contents = useMemo(
        () =>
            [
                ...(data?.folder.get?.folders ?? []),
                ...(data?.folder.get?.files ?? []),
            ] as FolderUnionFile[],
        [data]
    );

    useBackHandler(Boolean(selected?.size), () => {
        setSelected(new Set());
    });

    // Handlers
    const onShare = useCallback(
        (item: any) => {
            navigation.navigate("Share", {
                resource: item,
            });
        },
        [navigation]
    );

    const tapHandler = useCallback(
        (item: any) => {
            navigation.push("Folder", {
                id: item.id,
                name: item.name,
            });
        },
        [navigation]
    );

    const openContextMenu = useCallback(
        (item: any) => {
            itemContext.show(item).then((value) => {
                switch (value) {
                    case "star":
                        alert("star");
                        break;
                    case "manage-permissions":
                        navigation.navigate("ManagePermissions", {
                            resource: item,
                        });
                        break;
                    case "share":
                        onShare(item);
                        break;
                    case "rename":
                        setRenaming(item.id);
                        break;
                    case "copy":
                        navigation.navigate("Copier", {
                            resource: item,
                        });
                        break;
                    case "delete":
                        deleteFolderMutation({
                            variables: {
                                id: item.id,
                            },
                        });
                        break;
                }
            });
        },
        [deleteFolderMutation, itemContext, navigation, onShare]
    );

    const handleSelectionOption = useCallback(
        (option: any) => {
            switch (option) {
                case "delete":
                    selected.forEach((id) => {
                        setSelected((curr) => {
                            const newSet = new Set(curr);
                            newSet.delete(id);
                            return newSet;
                        });
                        folderService.delete.next({
                            id,
                            parentId: route.params.id,
                        });
                    });
                    break;
            }
        },
        [route.params.id, selected]
    );

    // Effects
    useEffect(() => {
        navigation.setOptions({
            //title: route.params.name,
            title: "",
            headerRight({ tintColor = theme.colors.text }) {
                return (
                    <View className="flex-row items-center gap-x-3">
                        <TouchableOpacity
                            className="p-2"
                            onPress={() => navigation.navigate("Search")}
                        >
                            <SearchIcon
                                size={22}
                                color={tintColor}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                onShare({
                                    __typename: "FolderType",
                                    ...route.params,
                                })
                            }
                            className="p-2"
                        >
                            <UserPlusIcon
                                size={22}
                                color={tintColor}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2">
                            <EllipsisVerticalIcon
                                size={22}
                                color={tintColor}
                            />
                        </TouchableOpacity>
                    </View>
                );
            },
        });
    }, [
        navigation,
        onShare,
        route.params,
        route.params.name,
        theme.colors.text,
    ]);

    useEffect(() => {
        const subscription = folderService.createResult$.subscribe((value) => {
            if (value.success)
                ToastAndroid.show(
                    `${value.data.name} created successful`,
                    ToastAndroid.LONG
                );
        });
        return () => subscription.unsubscribe();
    }, []);

    // Render
    return (
        <View style={{ flex: 1 }}>
            <View className="flex-row items-center gap-x-6 p-4">
                <RectButton onPress={() => setShowCreateInput((v) => !v)}>
                    <View className="flex-row items-center gap-x-3 rounded-full border border-text bg-text p-2 px-4">
                        <ArrowsUpDownIcon
                            size={20}
                            color={theme.colors.background}
                        />
                        <Text
                            variant="label"
                            color="background"
                        >
                            Upload
                        </Text>
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
                refreshing={refreshInProgress}
                onTap={tapHandler}
                onLongTap={openContextMenu}
                onRefresh={() => {
                    setRefreshInProgress(true);
                    refetch().finally(() => setRefreshInProgress(false));
                }}
                selection={selected}
                onSelect={(id) =>
                    setSelected((curr) =>
                        symmetricDifference(curr, new Set([id]))
                    )
                }
                newEntryInputShown={showCreateInput}
                onRequestStopEditing={() => setShowCreateInput(false)}
                onSubmitEditing={(name) => {
                    setShowCreateInput(false);
                    createNewFolder({
                        variables: {
                            name,
                            parentId: route.params.id,
                        },
                    });
                }}
                renaming={renaming}
                onRequestRenameDismiss={() => setRenaming(null)}
                onSubmitRename={(params) => {
                    renameFolderMutaion({
                        variables: {
                            folderId: params.id,
                            input: {
                                name: params.value,
                                parentId: route.params.id,
                            },
                        },
                    });
                }}
                onSelectionOption={handleSelectionOption}
                header={
                    <>
                        <Text variant="h1">
                            {route.params.name || route.name}
                        </Text>
                        {data?.folder.get?.path && (
                            <Breadcrumb
                                crumbs={[
                                    { id: "root", name: "Home" },
                                    ...(data?.folder.get?.path.map(
                                        ([id, name]) => ({
                                            id,
                                            name,
                                        })
                                    ) ?? []),
                                ]}
                                onPress={({ id, name }) => {
                                    if (id === "root")
                                        return navigation.popTo("Home");
                                    navigation.popTo("Folder", {
                                        id,
                                        name,
                                    });
                                }}
                            />
                        )}
                        <View className="mt-4 flex-row items-center gap-x-4">
                            {selected.size > 0 && (
                                <>
                                    <RectButton>
                                        <View className="flex-row items-center justify-center gap-x-4 rounded-full border border-text/15 bg-text/15 px-4 py-2">
                                            <Text variant="label">
                                                Share selected
                                            </Text>
                                            <ChevronDownIcon
                                                size={16}
                                                color={theme.colors.text}
                                            />
                                        </View>
                                    </RectButton>
                                    <SelectionContextMenu selected={selected} />
                                </>
                            )}
                        </View>
                    </>
                }
            />
        </View>
    );
}
