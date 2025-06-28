import { useMutation, useQuery } from "@apollo/client";
import List, { FolderUnionFile } from "../partials/List";
import { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../Router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    CreateFolderDocument,
    GetFolderDocument,
} from "../__generated__/schemas/graphql";
import { View } from "react-native";
import ButtonNew from "../partials/ButtonNew";
import ButtonUpload from "../partials/ButtonUpload";
import Text from "../components/Text";

type FolderRouteProp = RouteProp<RootStackParamList, "Folder">;
type FolderNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Folder"
>;
const typename = <T extends string>(name: T): T => name;

export default function FolderPage() {
    const route = useRoute<FolderRouteProp>();
    const navigation = useNavigation<FolderNavigationProp>();
    const { loading, data, refetch } = useQuery(GetFolderDocument, {
        variables: { id: route.params.id },
    });
    const [createFolder] = useMutation(CreateFolderDocument, {
        optimisticResponse(vars) {
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
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                },
            };
        },
        update(cache, { data }) {
            const incoming = data?.folder.create;
            if (!incoming) return;

            const existing = cache.readQuery({
                query: GetFolderDocument,
                variables: {
                    id: route.params.id,
                },
            });
            if (!existing) return;

            cache.writeQuery({
                query: GetFolderDocument,
                variables: {
                    id: route.params.id,
                },
                data: {
                    folder: {
                        get: {
                            ...existing.folder.get!,
                            folders: [
                                ...(existing.folder.get?.folders ?? []),
                                incoming,
                            ],
                        },
                    },
                },
            });
        },
    });

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

    useEffect(() => {
        navigation.setOptions({
            title: route.params.name,
        });
    }, [navigation, route.params.name]);

    const contents = [
        ...(data?.folder.get?.folders ?? []),
        ...(data?.folder.get?.files ?? []),
    ] as FolderUnionFile[];

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
                    setSelected((curr) =>
                        curr.symmetricDifference(new Set([id]))
                    )
                }
                header={
                    <Text variant="h1">{route.params.name || route.name}</Text>
                }
            />
        </View>
    );
}
