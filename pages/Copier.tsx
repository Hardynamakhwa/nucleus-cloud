import { FlatList, Pressable, View } from "react-native";
import Text from "../components/Text";
import { RootStackParamList } from "../Router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    RouteProp,
    useFocusEffect,
    useNavigation,
    useRoute,
    useTheme,
} from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import clsx from "clsx";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
    GetFolderDocument,
    GetRootDocument,
    UpdateFolderDocument,
} from "../__generated__/schemas/graphql";
import { FolderIcon } from "react-native-heroicons/outline";

type copierNavigationProps = NativeStackNavigationProp<RootStackParamList>;
type copierRouteProps = RouteProp<RootStackParamList, "Copier">;

const typename = <T extends string>(name: T): T => name;

export default function CopierPage() {
    // This page is intended to handle copying resources
    const theme = useTheme();
    const navigation = useNavigation<copierNavigationProps>();
    const route = useRoute<copierRouteProps>();
    const { resource, targetFolder } = route.params;

    const [queryRoot, { data: rootData }] = useLazyQuery(GetRootDocument, {
        fetchPolicy: "network-only",
    });

    const [queryFolder, { data: folderData }] = useLazyQuery(
        GetFolderDocument,
        {
            variables: { id: resource.id },
            fetchPolicy: "network-only",
        }
    );

    const [pasteFolder] = useMutation(UpdateFolderDocument, {
        variables: {
            id: targetFolder?.id ?? "root",
            data: {
                name: resource.name,
                parentId: targetFolder?.id ?? null,
            },
        },
        optimisticResponse(vars) {
            return {
                __typename: typename("Mutation"),
                folder: {
                    __typename: typename("FolderMutations"),
                    update: {
                        __typename: typename("FolderType"),
                        id: vars.id,
                        name: resource.name,
                        updatedAt: new Date().toISOString(),
                        createdAt: new Date().toISOString(),
                    },
                },
            };
        },
        update(cache, { data }) {
            const updatedFolder = data?.folder.update;
            if (!updatedFolder) return;

            if (!targetFolder) {
                const existing = cache.readQuery({
                    query: GetRootDocument,
                });

                cache.writeQuery({
                    query: GetRootDocument,
                    data: {
                        ...existing!,
                        folder: {
                            getAll: [
                                ...(existing?.folder.getAll ?? []),
                                updatedFolder,
                            ],
                        },
                    },
                });
                return;
            }

            const existing = cache.readQuery({
                query: GetFolderDocument,
                variables: { id: targetFolder.id },
            });
            if (!existing) return;

            cache.writeQuery({
                query: GetFolderDocument,
                data: {
                    ...existing,
                    folder: {
                        ...existing.folder,
                        get: {
                            ...existing.folder.get,
                            folders: [
                                ...(existing.folder.get?.folders ?? []),
                                updatedFolder,
                            ],
                        },
                    },
                },
            });
        },
        onCompleted() {
            navigation.goBack();
        },
        onError(error) {
            console.error("Error pasting folder:", error);
        },
    });

    useEffect(() => {
        navigation.setOptions({
            title: "",
            headerRight: () => (
                <View className="flex-row items-center gap-x-4">
                    <Text>Cancel</Text>
                    <Pressable
                        onPress={() => {
                            pasteFolder({
                                variables: {
                                    id: resource.id,
                                    data: {
                                        name: resource.name,
                                        parentId: targetFolder?.id ?? null,
                                    },
                                },
                            });
                        }}
                        className={clsx(
                            "flex-row items-center justify-center gap-x-2 self-start rounded-full bg-white p-2 px-4"
                        )}
                    >
                        {/* <ClipboardIcon
                            size={20}
                            color={theme.colors.background}
                        /> */}
                        <Text color="background">Paste</Text>
                    </Pressable>
                </View>
            ),
        });
    }, [navigation, resource.name, theme.colors.background]);

    useFocusEffect(
        useCallback(() => {
            if (targetFolder) {
                queryFolder();
            } else {
                queryRoot();
            }
        }, [queryFolder, queryRoot, targetFolder])
    );

    const renderItem = ({ item }: { item: { id: string; name: string } }) => (
        <Pressable
            onPress={() => {
                navigation.navigate("Copier", {
                    resource,
                    targetFolder: {
                        id: item.id,
                        name: item.name,
                    },
                });
            }}
            className="flex-row gap-x-4 border-border px-4 py-2.5"
        >
            <FolderIcon
                size={24}
                color={theme.colors.text}
            />
            <Text variant="label">{item.name}</Text>
        </Pressable>
    );

    const content =
        (!targetFolder ?
            rootData?.folder?.getAll
        :   folderData?.folder.get?.folders) ?? [];

    return (
        <View className="flex-1">
            <View className="p-4">
                <Text variant="h2">
                    Copy <Text variant="h1">{resource.name}</Text> to ..
                </Text>
            </View>
            <View className="p-4">
                {targetFolder ?
                    <Text variant="h4">{targetFolder.name}</Text>
                :   <Text>Home</Text>}
            </View>
            <FlatList
                data={content}
                renderItem={renderItem}
            />
        </View>
    );
}
