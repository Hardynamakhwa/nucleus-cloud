import { gql, useQuery } from "@apollo/client";
import List from "../partials/List";
import { useEffect, useState } from "react";
import {
    RouteProp,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../Router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type FolderRouteProp = RouteProp<RootStackParamList, "Folder">;
type FolderNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Folder"
>;

const GET_CONTENTS = gql`
    query GetContents($folderId: UUID) {
        folder {
            getAll(parentID: $parentId) {
                id
                name
                createdAt
            }
        }
        file {
            getAll(folderId: $folderId) {
                id
                name
                size
                mimeType
                ext
                createdAt
            }
        }
    }
`;

export default function FolderPage() {
    const route = useRoute<FolderRouteProp>();
    const navigation = useNavigation<FolderNavigationProp>();
    const { loading, data, refetch } = useQuery(GET_CONTENTS, {
        variables: { folderId: route.params.id },
    });
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        refetch().finally(() => setRefreshing(false));
    };

    useEffect(() => {
        navigation.setOptions({
            title: route.params.name,
        });
    }, []);

    return (
        <List
            data={[
                ...(data?.folder?.getAll ?? []),
                ...(data?.file?.getAll ?? []),
            ]}
            loading={loading}
            refreshing={refreshing}
            onRefresh={onRefresh}
        />
    );
}
