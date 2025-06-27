import { useQuery } from "@apollo/client";
import List, { FolderUnionFile } from "../partials/List";
import { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../Router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GetFolderContentsDocument } from "../__generated__/schemas/graphql";
import { View } from "react-native";
import ButtonNew from "../partials/ButtonNew";
import ButtonUpload from "../partials/ButtonUpload";
import Text from "../components/Text";

type FolderRouteProp = RouteProp<RootStackParamList, "Folder">;
type FolderNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Folder"
>;

export default function FolderPage() {
    const route = useRoute<FolderRouteProp>();
    const navigation = useNavigation<FolderNavigationProp>();
    const { loading, data, refetch } = useQuery(GetFolderContentsDocument, {
        variables: { folderId: route.params.id },
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
        ...(data?.folder?.getAll ?? []),
        ...(data?.file?.getAll ?? []),
    ] as unknown as FolderUnionFile[];

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
                onSelect={(id: string) =>
                    setSelected((curr) =>
                        curr.has(id) ?
                            new Set([...curr].filter((x) => x !== id))
                        :   new Set(curr).add(id) && new Set([...curr, id])
                    )
                }
                header={
                    <Text variant="h1">{route.params.name || route.name}</Text>
                }
            />
        </View>
    );
}
