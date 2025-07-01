import { useQuery } from "@apollo/client";
import {
    RouteProp,
    useNavigation,
    useRoute,
    useTheme,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import {
    ArrowsUpDownIcon,
    ChevronDownIcon,
    EllipsisHorizontalIcon,
    EllipsisVerticalIcon,
    PlusIcon,
    TrashIcon,
} from "react-native-heroicons/outline";
// @ts-ignore
import symmetricDifference from "set.prototype.symmetricdifference";
import { GetFolderDocument } from "../__generated__/schemas/graphql";
import Text, { TextThemed } from "../components/Text";
import useBackHandler from "../hooks/useBackHandler";
import List, { FolderUnionFile } from "../partials/List";
import { RootStackParamList } from "../Router";
import { folderService } from "../services/folder.actions";
import DownloadIcon from "../components/icons/DownloadIcon";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";
import UsersIcon from "../components/icons/UsersIcon";
import InfoIcon from "../components/icons/InfoIcon";
import UserPlusIcon from "../components/icons/UserPlusIcon";
import SearchIcon from "../components/icons/SearchIcon";

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

    // Effects
    useEffect(() => {
        navigation.setOptions({
            //title: route.params.name,
            title: "",
            headerRight({ tintColor = theme.colors.text }) {
                return (
                    <View className="flex-row items-center gap-x-3">
                        <TouchableOpacity className="p-2">
                            <SearchIcon
                                size={24}
                                color={tintColor}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2">
                            <UserPlusIcon
                                size={24}
                                color={tintColor}
                            />
                        </TouchableOpacity>
                        <Options />
                    </View>
                );
            },
        });
    }, [navigation, route.params.name, theme.colors.text]);

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
                    <View className="flex-row items-center gap-x-3 rounded-full border border-text/15 bg-text/15 p-2 px-4">
                        <ArrowsUpDownIcon
                            size={20}
                            color={theme.colors.text}
                        />
                        <Text variant="label">Upload</Text>
                    </View>
                </RectButton>
                <RectButton onPress={() => setShowCreateInput((v) => !v)}>
                    <View className="flex-row items-center gap-x-3 rounded-full border border-text/65 p-2 px-4">
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
                                    <SelectionContextMenu />
                                </>
                            )}
                        </View>
                    </>
                }
            />
        </View>
    );
}

function Options() {
    const theme = useTheme();
    return (
        <Menu>
            <MenuTrigger>
                <View className="p-2">
                    <EllipsisVerticalIcon
                        size={24}
                        color={theme.colors.text}
                    />
                </View>
            </MenuTrigger>
            <MenuOptions
                customStyles={{
                    optionsContainer: {
                        backgroundColor: theme.colors.card,
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: theme.colors.border,
                    },
                    optionWrapper: {
                        flexDirection: "row",
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        columnGap: 16,
                    },
                }}
            >
                <MenuOption>
                    <UsersIcon
                        size={20}
                        color={theme.colors.text}
                    />
                    <TextThemed
                        variant="label"
                        theme={theme}
                    >
                        Manage access
                    </TextThemed>
                </MenuOption>
                <MenuOption>
                    <InfoIcon
                        size={20}
                        color={theme.colors.text}
                    />
                    <TextThemed
                        variant="label"
                        theme={theme}
                    >
                        Info
                    </TextThemed>
                </MenuOption>
            </MenuOptions>
        </Menu>
    );
}

function SelectionContextMenu() {
    const theme = useTheme();
    return (
        <Menu>
            <MenuTrigger>
                <View className="p-2">
                    <EllipsisHorizontalIcon
                        size={24}
                        color={theme.colors.text}
                    />
                </View>
            </MenuTrigger>
            <MenuOptions
                customStyles={{
                    optionsContainer: {
                        backgroundColor: theme.colors.card,
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: theme.colors.border,
                    },
                    optionWrapper: {
                        flexDirection: "row",
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        columnGap: 16,
                    },
                }}
            >
                <MenuOption>
                    <UsersIcon
                        size={20}
                        color={theme.colors.text}
                    />
                    <TextThemed
                        variant="label"
                        theme={theme}
                    >
                        Manage access
                    </TextThemed>
                </MenuOption>
                <MenuOption>
                    <DownloadIcon
                        size={20}
                        color={theme.colors.text}
                    />
                    <TextThemed
                        variant="label"
                        theme={theme}
                    >
                        Download
                    </TextThemed>
                </MenuOption>
                <View className="border-b border-border" />
                <MenuOption>
                    <TrashIcon
                        size={20}
                        color={theme.colors.text}
                    />
                    <TextThemed
                        variant="label"
                        theme={theme}
                    >
                        Delete
                    </TextThemed>
                </MenuOption>
                <View className="border-b border-border" />
                <MenuOption>
                    <InfoIcon
                        size={20}
                        color={theme.colors.text}
                    />
                    <TextThemed
                        variant="label"
                        theme={theme}
                    >
                        Info
                    </TextThemed>
                </MenuOption>
            </MenuOptions>
        </Menu>
    );
}
