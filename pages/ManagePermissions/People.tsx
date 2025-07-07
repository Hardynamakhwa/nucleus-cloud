import React, { useCallback, useMemo } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import Text from "../../components/Text";
import { useMutation, useQuery, NetworkStatus } from "@apollo/client";
import { RectButton } from "react-native-gesture-handler";
import {
    GetFolderPermissionsDocument,
    Role,
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

const typename = <T extends string>(name: T): T => name;

const ITEM_HEIGHT = 64;
const ROLE_OPTIONS = [
    { icon: EyeIcon, label: "viewer", value: Role.Viewer },
    { icon: PencilSquareIcon, label: "editor", value: Role.Editor },
] as const;

const PeopleItem = React.memo(({ item, onRoleChange, isOwner }: { item: any, onRoleChange: (data: UpdateFolderPermissionInput) => void, isOwner: boolean }) => {
    return <RectButton>
        <View className="flex-row items-center gap-x-4 px-4 py-2">
            <View>
                <GravatarImage
                    email={item.user.email}
                    size={38}
                />
            </View>
            <View className="flex-1">
                <Text variant="label">{item.user.email}</Text>
                {!isOwner && (
                    <View className="opacity-65">
                        <Text variant="subtitle">
                            {dayjs().format(
                                "[On] MMM DD ddd, YYYY [at] HH:mm"
                            )}
                        </Text>
                    </View>
                )}
            </View>
            {isOwner ?
                <Text variant="label">{item.role}</Text>
                : <PopupMenu
                    onOptionSelect={(role) =>
                        onRoleChange({
                            permissionId: item.id,
                            role: role as Role,
                        })
                    }
                    items={ROLE_OPTIONS}
                >
                    <Text>{item.role}</Text>
                </PopupMenu>
            }
        </View>
    </RectButton>
});


function People() {
    const theme = useTheme();
    const navigation = useNavigation<managePermissionsNavigation>();
    const folderId = useMemo(() => {
        const parentState = navigation.getParent()?.getState();
        return parentState?.routes[parentState.index].params?.id;
    }, [navigation]);

    const { data, loading, refetch, networkStatus } = useQuery(GetFolderPermissionsDocument, {
        variables: {
            folderId,
        },
        notifyOnNetworkStatusChange: true,
    });

    const [updatePermission] = useMutation(UpdateFolderPermissionDocument, {
        update(cache, { data }) {
            const updated = data?.folderPermission.update;
            if (!updated) return;

            cache.modify({
                id: cache.identify({ __typename: "FolderPermissionType", id: updated.id }),
                fields: {
                    role() {
                        return updated.role;
                    },
                },
            });
        },
        optimisticResponse(vars) {
            return {
                __typename: typename("Mutation"),
                folderPermission: {
                    __typename: typename("FolderPermissionMutations"),
                    update: {
                        __typename: typename("FolderPermissionType"),
                        id: vars.input.permissionId,
                        role: vars.input.role,
                        user: {
                            __typename: typename("UserType"),
                            email: "", // Will be populated from cache
                            id: "",
                        }
                    }
                },
            };
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

    const renderItem = useCallback(({ item }: { item: any }) => (
        <PeopleItem
            item={item}
            onRoleChange={changePermissionHandler}
            isOwner={item.role === Role.Owner}
        />
    ), [changePermissionHandler]);

    const getItemLayout = useCallback((_data: any, index: number) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    }), []);

    const contents = data?.folderPermission.getByFolder ?? [];

    return (
        <FlatList
            data={contents}
            refreshing={networkStatus === NetworkStatus.refetch}
            onRefresh={refetch}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            keyExtractor={({ id }: { id: string }) => id}
            ListFooterComponent={
                loading && networkStatus !== NetworkStatus.refetch ?
                    <View className="items-center justify-center p-6">
                        <ActivityIndicator
                            size="large"
                            color={theme.colors.primary}
                        />
                    </View>
                    : null
            }
        />
    );
};

export default People;
