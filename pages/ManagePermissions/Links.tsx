import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import Text from "../../components/Text";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Router";
import { useQuery } from "@apollo/client";
import { useTheme, useNavigation } from "@react-navigation/native";
import { GetFolderLinksDocument } from "../../__generated__/schemas/graphql";
import dayjs from "dayjs";
import { RectButton } from "react-native-gesture-handler";

type managePermissionsNavigation = NativeStackNavigationProp<
    RootStackParamList,
    "ManagePermissions"
>;
const Links = () => {
    const theme = useTheme();
    const navigation = useNavigation<managePermissionsNavigation>();
    const parentState = navigation.getParent()?.getState();
    const params = parentState?.routes[parentState.index].params;

    const { data, loading } = useQuery(GetFolderLinksDocument, {
        variables: {
            folderId: params?.id,
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
