import { useMutation, useQuery } from "@apollo/client";
import { TouchableOpacity, View } from "react-native";
import List, { FolderUnionFile } from "../partials/List";
import { useEffect, useState } from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Router";
import { useNavigation, useTheme } from "@react-navigation/native";
import { GetFolderContentsDocument } from "../__generated__/schemas/graphql";
import GravatarImage from "../components/GravatarImage";
import useAuth from "../hooks/useAuth";
import ButtonNew from "../partials/ButtonNew";
import ButtonUpload from "../partials/ButtonUpload";

type HomeNavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function HomePage() {
    const navigation = useNavigation<HomeNavigationProps>();
    const theme = useTheme();
    const auth = useAuth();

    const { loading, data, refetch, error } = useQuery(
        GetFolderContentsDocument
    );

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

    const contents = [
        ...(data?.folder?.getAll ?? []),
        ...(data?.file?.getAll ?? []),
    ] as unknown as FolderUnionFile[];

    useEffect(() => {
        navigation.setOptions({
            headerLeft(props) {
                return (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Settings")}
                    >
                        <GravatarImage
                            email={`${auth.user?.email}`}
                            size={42}
                        />
                    </TouchableOpacity>
                );
            },
        });
    }, [auth.user?.email, navigation]);

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
                onSelect={(id) =>
                    setSelected((currentState) =>
                        currentState.symmetricDifference(new Set([id]))
                    )
                }
            />
        </View>
    );
}
