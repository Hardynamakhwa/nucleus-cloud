import React, {useState} from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import Text from "../../components/Text";
import { useMutation, useQuery } from "@apollo/client";
import { RectButton } from "react-native-gesture-handler";
import {
    GetFolderPermissionsDocument,
    Role,
    Scalars,
    UpdateFolderPermissionDocument,
    UpdateFolderPermissionInput,
} from "../../__generated__/schemas/graphql";
import GravatarImage from "../../components/GravatarImage";
import dayjs from "dayjs";
import { useNavigation, useTheme } from "@react-navigation/native";
import { RootStackParamList } from "../../Router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PopupMenu from "../../components/PopupMenu";
import { EyeIcon, PencilSquareIcon } from "react-native-heroicons/outline";

type managePermissionsNavigation = NativeStackNavigationProp<
    RootStackParamList,
    "ManagePermissions"
>;

const People = () => {
    const theme = useTheme();
    const navigation = useNavigation<managePermissionsNavigation>();
    const parentState = navigation.getParent()?.getState();
    const params = parentState?.routes[parentState.index].params;

    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery(GetFolderPermissionsDocument, {
        variables: {
            folderId: params?.id,
        },
    });

    const [updatePermission] = useMutation(UpdateFolderPermissionDocument, {
        /* optimisticResponse(vars) {
            return {
                __typename: "Mutation",
                folderPermission: {
                    __typename: "FolderPermissionMutations",
                    update: {
                        __typename: "FolderPermissionType",
                        id: vars.input.permissionId,
                        role: vars.input.role,
                        user: {
                            __typename: "UserType",
                            email: "" ,
                            id: "",
                        }
                    }
                },
            };
        },*/
        update(cache, { data }) {
            const updated = data?.folderPermission.update;
            if (!updated) return;

            const existing = cache.readQuery({
                query: GetFolderPermissionsDocument,
                variables: {
                    folderId: params?.id,
                },
            });
            if (!existing?.folderPermission.getByFolder) return;

            cache.writeQuery({
                query: GetFolderPermissionsDocument,
                variables: {
                    folderId: params?.id,
                },
                data: {
                    ...existing,
                    folderPermission: {
                        ...existing.folderPermission,
                        getByFolder: existing.folderPermission.getByFolder.map(
                            (permission) => {
                                if (permission.id === updated.id)
                                    return updated;
                                return permission;
                            }
                        ),
                    },
                },
            });
        },
    });

    const changePermissionHandler = async (
        data: UpdateFolderPermissionInput
    ) => {
        await updatePermission({
            variables: {
                input: data,
            },
        });
    };

    const contents = data?.folderPermission.getByFolder ?? [];

    return (
        <FlatList
            data={contents}
            refreshing={refreshing}
            onRefresh={refetch}
            renderItem={({ item }) => (
                <RectButton>
                    <View className="flex-row items-center gap-x-4 px-4 py-2">
                        <View>
                            <GravatarImage
                                email={item.user.email}
                                size={38}
                            />
                        </View>
                        <View className="flex-1">
                            <Text variant="label">{item.user.email}</Text>
                            {item.role !== Role.Owner && (
                                <View className="opacity-65">
                                    <Text variant="subtitle">
                                        {dayjs().format(
                                            "[On] MMM DD ddd, YYYY [at] HH:mm"
                                        )}
                                    </Text>
                                </View>
                            )}
                        </View>
                        {item.role === Role.Owner ?
                            <Text variant="label">{item.role}</Text>
                        :   <PopupMenu
                                onOptionSelect={(role) =>
                                    changePermissionHandler({
                                        permissionId: item.id,
                                        role: role as Role,
                                    })
                                }
                                items={[
                                    {
                                        icon: EyeIcon,
                                        label: "viewer",
                                        value: "viewer" as Role,
                                    },
                                    {
                                        icon: PencilSquareIcon,
                                        label: "editor",
                                        value: "editor" as Role,
                                    },
                                ]}
                            >
                                <Text>{item.role}</Text>
                            </PopupMenu>
                        }
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

export default People;
