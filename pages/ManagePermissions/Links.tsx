import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import Text from "../../components/Text";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Router";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useTheme, useNavigation, useRoute } from "@react-navigation/native";
import { GetFolderLinksDocument } from "../../__generated__/schemas/graphql";
import dayjs from "dayjs";
import { RectButton } from "react-native-gesture-handler";
import { LinkIcon } from "react-native-heroicons/outline";

type managePermissionsNavigation = NativeStackNavigationProp<
    RootStackParamList,
    "ManagePermissions"
>;
const Links = () => {
    const theme = useTheme();
    const navigation = useNavigation<managePermissionsNavigation>();
    const parentState = navigation.getParent()?.getState();
    const resource = parentState?.routes[parentState.index].params?.resource;
    const route = useRoute();

    const [q, { data, loading }] = useLazyQuery(GetFolderLinksDocument, {
        variables: {
            folderId: resource?.id,
        },
    });

    const contents = data?.link.getByFolder ?? [];
    return (
        <FlatList
            data={contents}
            renderItem={({ item }) => (
                <RectButton>
                    <View className="flex-row items-center gap-x-4 px-4 py-2">
                        <View className="flex-1">
                            <Text variant="label">{item.id}</Text>
                            <View className="opacity-65">
                                <Text variant="subtitle">
                                    {dayjs().format(
                                        "[On] MMM DD ddd, YYYY [at] HH:mm"
                                    )}
                                </Text>
                            </View>
                        </View>
                        <Text variant="label">
                            {item.isPublic ? "public" : "private"}
                        </Text>
                    </View>
                </RectButton>
            )}
            keyExtractor={({ id }) => id}
            ListFooterComponent={
                loading ?
                    <View className="items-center justify-center p-6">
                        <ActivityIndicator
                            size="large"
                            color={theme.colors.primary}
                        />
                    </View>
                :   undefined
            }
        />
    );
};

export default Links;
