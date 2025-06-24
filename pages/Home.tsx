import { gql, useQuery } from "@apollo/client";
import { Text } from "react-native";
import List from "../partials/List";
import { useState } from "react";

const GET_CONTENTS = gql`
    query GetContents {
        folder {
            getAll {
                id
                name
                createdAt
            }
        }
        file {
            getAll {
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

export default function HomePage() {
    const { loading, data, refetch } = useQuery(GET_CONTENTS);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        refetch().finally(() => setRefreshing(false));
    };

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
