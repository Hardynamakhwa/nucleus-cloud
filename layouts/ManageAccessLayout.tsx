import {
    NavigationHelpers,
    ParamListBase,
    TabNavigationState,
    useTheme,
} from "@react-navigation/native";
import { ReactNode } from "react";
import { View, Text as RNText } from "react-native";
import Text from "../components/Text";
import { FolderUnionFile } from "../partials/List";
import { RectButton } from "react-native-gesture-handler";
import { LinkIcon } from "react-native-heroicons/outline";
import UserPlusIcon from "../components/icons/UserPlusIcon";

export default function ManageAccessLayout(props: {
    state: TabNavigationState<ParamListBase>;
    navigation: NavigationHelpers<ParamListBase>;
    children: ReactNode;
}) {
    const theme = useTheme();
    const parentState = props.navigation.getParent?.()?.getState();
    const params = parentState?.routes[parentState.index].params as
        | FolderUnionFile
        | undefined;

    return (
        <View className="flex-1">
            <View className="p-4">
                <Text variant="h3">
                    Manage access to{" "}
                    <RNText className="border-b border-text">
                        {params?.name}
                    </RNText>
                </Text>
            </View>
            {/* <View className="flex-row items-center gap-x-4 p-4">
                <RectButton>
                    <View className="flex-row items-center gap-x-3 rounded-full border border-text/15 bg-text/15 p-2 px-4">
                        <UserPlusIcon
                            size={20}
                            color={theme.colors.text}
                        />
                        <Text variant="label">Add People</Text>
                    </View>
                </RectButton>
                <RectButton>
                    <View className="flex-row items-center gap-x-3 rounded-full border border-text/65 p-2 px-4">
                        <LinkIcon
                            size={20}
                            color={theme.colors.text}
                        />
                        <Text
                            color="secondary"
                            variant="label"
                        >
                            Create Link
                        </Text>
                    </View>
                </RectButton>
            </View> */}
            {props.children}
        </View>
    );
}
