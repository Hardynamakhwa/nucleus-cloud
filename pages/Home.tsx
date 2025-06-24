import { gql, useMutation, useQuery } from "@apollo/client";
import { Text, View } from "react-native";
import List, { FolderUnionFile } from "../partials/List";
import { useState } from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Router";
import { useNavigation } from "@react-navigation/native";
import {
    CreateFolderDocument,
    GetFolderContentsDocument,
} from "../__generated__/schemas/graphql";
import { Button } from "../components/Button";
import { Field, Input, Label } from "../components/Input";

type HomeNavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function HomePage() {
    const navigation = useNavigation<HomeNavigationProps>();
    const { loading, data, refetch, error } = useQuery(
        GetFolderContentsDocument
    );
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
        if (name) createFolder({ variables: { data: { name } } });
    };

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
