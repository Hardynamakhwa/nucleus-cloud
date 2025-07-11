import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    TextInput,
    View,
} from "react-native";
import Text from "../../components/Text";
import {
    RouteProp,
    useNavigation,
    useRoute,
    useTheme,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Router";
import { useCallback, useEffect, useMemo, useState } from "react";
// eslint-disable-next-line import/no-named-as-default
import clsx from "clsx";
import { useMutation } from "@apollo/client";
import {
    CreateFolderPermissionDocument,
    GetFolderPermissionsDocument,
    Role,
} from "../../__generated__/schemas/graphql";

type shareNavigation = NativeStackNavigationProp<RootStackParamList, "Share">;
type shareRoute = RouteProp<RootStackParamList, "Share">;

const typename = <T extends string>(name: T): T => name;

function Share() {
    const theme = useTheme();
    const navigation = useNavigation<shareNavigation>();
    const route = useRoute<shareRoute>();
    const resource = useMemo(() => route.params.resource, [route]);

    const [createFolderPermission, { loading }] = useMutation(
        CreateFolderPermissionDocument,
        {
            optimisticResponse(vars) {
                return {
                    __typename: typename("Mutation"),
                    folderPermission: {
                        __typename: typename("FolderPermissionMutations"),
                        create: {
                            __typename: typename("FolderPermissionType"),
                            id:
                                "temp-id-"
                                + Math.random().toString(36).slice(2),
                            role: vars.input.role,
                            user: {
                                id:
                                    "temp-id-"
                                    + Math.random().toString(36).slice(2),
                                email: vars.input.email,
                            },
                        },
                    },
                };
            },
            update(cache, { data }) {
                const newPermission = data?.folderPermission.create;
                if (!newPermission) return;

                const existing = cache.readQuery({
                    query: GetFolderPermissionsDocument,
                    variables: {
                        folderId: resource.id,
                    },
                });
                if (!existing?.folderPermission.getByFolder) return;

                cache.writeQuery({
                    query: GetFolderPermissionsDocument,
                    variables: {
                        folderId: resource.id,
                    },
                    data: {
                        ...existing,
                        folderPermission: {
                            ...existing.folderPermission,
                            getByFolder: [
                                ...(existing.folderPermission.getByFolder
                                    ?? []),
                                newPermission,
                            ],
                        },
                    },
                });
            },
        }
    );
    const [formState, setFormState] = useState<{
        email: string;
        permission: Role;
    }>({
        email: "",
        permission: Role.Viewer,
    });

    const disableSubmit = useMemo(
        () => !Object.values(formState).every(Boolean),
        [formState]
    );

    const submit = useCallback(() => {
        createFolderPermission({
            variables: {
                input: {
                    email: formState.email,
                    role: formState.permission,
                    id: resource.id,
                },
            },
            onCompleted(data, clientOptions) {
                navigation.popTo("ManagePermissions", { resource });
            },
            onError(error, clientOptions) {
                console.warn(error.message);
            },
        });
    }, [
        createFolderPermission,
        formState.email,
        formState.permission,
        navigation,
        resource,
    ]);

    useEffect(() => {
        navigation.setOptions({
            title: resource.name,
            headerRight() {
                return (
                    <Pressable
                        onPress={submit}
                        disabled={disableSubmit || loading}
                        className={clsx(
                            "tems-center flex-row justify-center gap-x-4 self-start rounded-full bg-white p-2 px-4",
                            { "opacity-50": disableSubmit }
                        )}
                    >
                        {loading && (
                            <ActivityIndicator
                                size="small"
                                color={theme.colors.background}
                            />
                        )}

                        <Text color="background">Share</Text>
                    </Pressable>
                );
            },
        });
    }, [
        disableSubmit,
        loading,
        navigation,
        resource.name,
        submit,
        theme.colors.background,
    ]);

    const heading = useMemo(
        () =>
            `Share this ${resource.__typename === "FileType" ? "file" : "folder"}`,
        [resource.__typename]
    );

    return (
        <ScrollView>
            <View className="p-4">
                <Text variant="h3">{heading}</Text>
            </View>
            <View className="flex-col gap-y-2 p-4">
                <Text variant="label">Enter an email address</Text>
                <TextInput
                    multiline={false}
                    className="border border-neutral-300 bg-neutral-200 p-2.5 font-[MontrealRegular] text-black focus:border-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:border-neutral-300"
                    keyboardType="email-address"
                    value={formState.email}
                    onChangeText={(email) =>
                        setFormState((curr) => ({ ...curr, email }))
                    }
                    returnKeyType="done"
                    autoComplete="email"
                />
            </View>
            <View className="flex-col gap-y-2 p-4">
                <Text variant="label">Permission</Text>
                <View className="opacity-65">
                    <Text variant="subtitle">
                        {`People with this permission to this ${resource.__typename === "FileType" ? "file" : "folder"} can:`}
                    </Text>
                </View>
                <View className="flex-col gap-y-3">
                    <Radio
                        checked={formState.permission === "viewer"}
                        label="view"
                        onSelect={(permission) => {
                            setFormState((curr) => ({ ...curr, permission }));
                        }}
                        value="viewer"
                    />
                    <Radio
                        checked={formState.permission === "editor"}
                        label="edit"
                        onSelect={(permission) => {
                            setFormState((curr) => ({ ...curr, permission }));
                        }}
                        value="editor"
                    />
                </View>
            </View>
        </ScrollView>
    );
}

function Radio({
    value,
    label,
    onSelect,
    checked = false,
}: {
    value: string;
    label: string;
    onSelect(value: any): void;
    checked?: boolean;
}) {
    return (
        <Pressable
            onPress={() => onSelect(value)}
            className="flex-row items-center gap-x-4"
        >
            <View
                className={clsx([
                    "size-6 items-center justify-center rounded-full border",
                    {
                        "border-neutral-700 bg-neutral-800": !checked,
                        "border-neutral-700 bg-neutral-600": checked,
                    },
                ])}
            >
                <View
                    className={clsx(
                        "size-3",
                        checked && "bg-neutral-950 dark:bg-neutral-50"
                    )}
                    style={{ borderRadius: "100%" }}
                />
            </View>
            <Text>{label}</Text>
        </Pressable>
    );
}

export default Share;
