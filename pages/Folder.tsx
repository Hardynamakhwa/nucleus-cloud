import { gql, useMutation, useQuery } from "@apollo/client";
import List, { FolderUnionFile } from "../partials/List";
import { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../Router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    CreateFolderDocument,
    GetFolderContentsDocument,
} from "../__generated__/schemas/graphql";
import { View } from "react-native";
import { Field, Label, Input } from "../components/Input";
import { Button } from "../components/Button";

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
    const [createFolder, { data: createFolderData }] =
        useMutation(CreateFolderDocument);
    const [refreshing, setRefreshing] = useState(false);
    const [name, setName] = useState("");

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

    const onCreateFolder = () => {
        if (name)
            createFolder({
                variables: { data: { name, parentId: route.params.id } },
            });
    };

    useEffect(() => {
        navigation.setOptions({
            title: route.params.name,
        });
    }, []);

    const contents = [
        ...(data?.folder?.getAll ?? []),
        ...(data?.file?.getAll ?? []),
    ] as unknown as FolderUnionFile[];

    return (
        <View style={{ flex: 1 }}>
            <Field>
                <Label>Folder name</Label>
                <Input onInput={(text) => setName(text)} />
            </Field>
            <Button onTap={onCreateFolder}>Create</Button>
            <List
                data={contents}
                loading={loading}
                refreshing={refreshing}
                onTap={onTapHandler}
                onRefresh={onRefresh}
            />
        </View>
    );
}
