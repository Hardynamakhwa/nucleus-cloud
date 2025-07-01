import { useQuery } from "@apollo/client";
import {
    RouteProp,
    useNavigation,
    useRoute,
    useTheme,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ToastAndroid, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import {
    ArrowDownTrayIcon,
    ChevronDownIcon,
    EllipsisHorizontalIcon,
    PencilSquareIcon,
    PlusCircleIcon,
    PlusIcon,
    TrashIcon,
} from "react-native-heroicons/outline";
// @ts-ignore
import symmetricDifference from "set.prototype.symmetricdifference";
import { GetFolderDocument } from "../__generated__/schemas/graphql";
import PopupMenu from "../components/PopupMenu";
import Text from "../components/Text";
import useBackHandler from "../hooks/useBackHandler";
import List, { FolderUnionFile } from "../partials/List";
import { RootStackParamList } from "../Router";
import { folderService } from "../services/folder.actions";

type FolderRouteProp = RouteProp<RootStackParamList, "Folder">;
type FolderNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Folder"
>;

export default function FolderPage() {
    // State declarations
    const [refreshInProgress, setRefreshInProgress] = useState(false);
    const [selected, setSelected] = useState(new Set<string>());
    const [showCreateInput, setShowCreateInput] = useState(false);

    // Navigation and route hooks
    const theme = useTheme();
    const route = useRoute<FolderRouteProp>();
    const navigation = useNavigation<FolderNavigationProp>();

    // Data fetching
    const { loading, data, refetch } = useQuery(GetFolderDocument, {
        variables: { id: route.params.id },
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

    const popupMenu = useMemo(
        () =>
            [
                {
                    label: "Download",
                    value: "download",
                    icon: ArrowDownTrayIcon,
                },
                selected.size === 1 && {
                    label: "Rename",
                    value: "rename",
                    icon: PencilSquareIcon,
                },
                {
                    label: "Delete",
                    value: "delete",
                    icon: TrashIcon,
                },
            ].filter((item) => Boolean(item)),
        [selected.size]
    );

    const selectionMenuTitle = useMemo(
        () =>
            selected.size > 0 ?
                selected.size === 1 ?
                    `${contents.find(({ id }) => id === selected.values().next().value)?.name}`
                :   `${selected.size} selected`
            :   "",
        [contents, selected]
    );

    // Effects
    useEffect(() => {
        navigation.setOptions({
            //title: route.params.name,
            title: "",
        });
    }, [navigation, route.params.name]);

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

    useBackHandler(Boolean(selected?.size), () => {
        setSelected(new Set());
    });

    // Handlers
    const onTapHandler = useCallback(
        (item: any) => {
            navigation.push("Folder", {
                id: item.id,
                name: item.name,
            });
        },
        [navigation]
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

    // Render
    return (
        <View style={{ flex: 1 }}>
            <View className="flex-row items-center gap-x-6 p-4">
                <RectButton onPress={() => setShowCreateInput((v) => !v)}>
                    <View className="flex-row items-center gap-x-3 border border-text bg-text p-2 px-4">
                        <PlusCircleIcon
                            size={18}
                            color={theme.colors.background}
                        />
                        <Text color="background">Upload</Text>
                    </View>
                </RectButton>
                <RectButton onPress={() => setShowCreateInput((v) => !v)}>
                    <View className="flex-row items-center gap-x-3 border border-text/80 p-2 px-4">
                        <PlusIcon
                            size={18}
                            color={theme.colors.text}
                        />
                        <Text color="secondary">Create</Text>
                    </View>
                </RectButton>
            </View>
            <List
                data={contents}
                loading={loading}
                refreshing={refreshInProgress}
                onTap={onTapHandler}
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
                    folderService.create.next({
                        name,
                        parentId: route.params.id,
                    });
                    setShowCreateInput(false);
                }}
                onSelectionOption={handleSelectionOption}
                header={
                    <>
                        <Text variant="h1">
                            {route.params.name || route.name}
                        </Text>
                        <View className="mt-4 flex-row items-center gap-x-4">
                            {selected.size > 0 && (
                                <>
                                    <RectButton>
                                        <View className="flex-row items-center justify-center gap-x-4 bg-text px-4 py-2">
                                            <Text color="background">
                                                Share selected
                                            </Text>
                                            <ChevronDownIcon
                                                size={16}
                                                color={theme.colors.background}
                                            />
                                        </View>
                                    </RectButton>
                                    <PopupMenu
                                        //@ts-ignore
                                        items={popupMenu}
                                        title={selectionMenuTitle}
                                        onOptionSelect={handleSelectionOption}
                                    >
                                        <View className="p-2">
                                            <EllipsisHorizontalIcon
                                                size={24}
                                                color={theme.colors.text}
                                            />
                                        </View>
                                    </PopupMenu>
                                </>
                            )}
                        </View>
                    </>
                }
            />
        </View>
    );
}
