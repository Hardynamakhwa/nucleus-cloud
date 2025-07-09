import {
    NavigationHelpers,
    ParamListBase,
    TabNavigationState,
} from "@react-navigation/native";
import { ReactNode } from "react";
import { View, Text as RNText } from "react-native";
import Text from "../components/Text";
import { FolderUnionFile } from "../partials/List";

export default function ManagePermissionsLayout(props: {
    state: TabNavigationState<ParamListBase>;
    navigation: NavigationHelpers<ParamListBase>;
    children: ReactNode;
}) {
    const parentState = props.navigation.getParent?.()?.getState();
    const params = parentState?.routes[parentState.index].params as
        | FolderUnionFile
        | undefined;

    return (
        <View className="flex-1">
            <View className="p-4">
                <Text variant="h3">
                    access to{" "}
                    <RNText className="border-b border-text">
                        {params?.name}
                    </RNText>
                </Text>
            </View>
            {props.children}
        </View>
    );
}
