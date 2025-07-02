import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";
import GravatarImage from "../components/GravatarImage";
import { useMemo, useRef, useState } from "react";
import { TextThemed } from "../components/Text";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import store from "../stores";
import { observer } from "mobx-react-lite";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Router";
import { RectButton } from "react-native-gesture-handler";
import UserPlusIcon from "../components/icons/UserPlusIcon";
type homeNavigation = NativeStackNavigationProp<RootStackParamList, "Home">;
function UserOverview() {
    const navigation = useNavigation<homeNavigation>();
    const theme = useTheme();
    const menuRef = useRef<Menu>(null);

    const image = useMemo(
        () => (
            <GravatarImage
                email={`${store.auth.user?.email}`}
                size={42}
            />
        ),
        []
    );

    const logout = async () => {
        await store.auth.logout();
    };

    const toSettings = () => navigation.navigate("Settings");
    return (
        <>
            <Menu ref={menuRef}>
                <MenuTrigger
                    customStyles={{
                        TriggerTouchableComponent: TouchableOpacity,
                    }}
                >
                    {image}
                </MenuTrigger>
                <MenuOptions
                    customStyles={{
                        optionsContainer: {
                            backgroundColor: theme.colors.card,
                            borderWidth: StyleSheet.hairlineWidth,
                            borderColor: theme.colors.border,
                            maxWidth: "100%",
                            minWidth: 280,
                            borderRadius: 8,
                        },
                        OptionTouchableComponent: RectButton,
                        optionWrapper: {
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 16,
                            columnGap: 16,
                            paddingVertical: 10,
                        },
                    }}
                >
                    <View className="border-b border-border p-4">
                        <View className="flex-row items-end gap-x-4">
                            {image}
                            <View className="flex-1 flex-col items-start">
                                <TextThemed
                                    theme={theme}
                                    singleLine
                                >
                                    <Text numberOfLines={1}>
                                        {store.auth.user?.email}
                                    </Text>
                                </TextThemed>
                            </View>
                        </View>
                    </View>
                    <MenuOption onSelect={toSettings}>
                        <TextThemed
                            variant="label"
                            theme={theme}
                        >
                            Settings
                        </TextThemed>
                    </MenuOption>
                    <MenuOption>
                        <TextThemed
                            variant="label"
                            theme={theme}
                        >
                            Manage account
                        </TextThemed>
                    </MenuOption>
                    <MenuOption>
                        <TextThemed
                            variant="label"
                            theme={theme}
                        >
                            Theme
                        </TextThemed>
                        <ChevronRightIcon
                            size={18}
                            color={theme.colors.text}
                            style={{ marginLeft: "auto" }}
                        />
                    </MenuOption>
                    <MenuOption onSelect={logout}>
                        <TextThemed
                            variant="label"
                            theme={theme}
                        >
                            Log out
                        </TextThemed>
                    </MenuOption>
                    <View className="border-b border-border" />
                    <MenuOption onSelect={logout}>
                        <UserPlusIcon
                            size={20}
                            color={theme.colors.text}
                        />
                        <TextThemed
                            variant="label"
                            theme={theme}
                        >
                            Add an account
                        </TextThemed>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </>
    );
}

export default observer(UserOverview);
