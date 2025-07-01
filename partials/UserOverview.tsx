import { TouchableOpacity, View } from "react-native";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";
import GravatarImage from "../components/GravatarImage";
import { useMemo } from "react";
import { TextThemed } from "../components/Text";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import store from "../stores";
import { observer } from "mobx-react-lite";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Router";
type homeNavigation = NativeStackNavigationProp<RootStackParamList, "Home">;
function UserOverview() {
    const navigation = useNavigation<homeNavigation>();
    const theme = useTheme();
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
        <Menu>
            <MenuTrigger
                customStyles={{ TriggerTouchableComponent: TouchableOpacity }}
            >
                {image}
            </MenuTrigger>
            <MenuOptions>
                <View className="border-b border-border p-4">
                    <View className="flex-row items-end gap-x-4">
                        {image}
                        <View className="flex-1 flex-col items-start">
                            <TextThemed
                                theme={theme}
                                variant="h4"
                            >
                                {store.auth.user?.email}
                            </TextThemed>
                        </View>
                    </View>
                </View>
                <MenuOption onSelect={toSettings}>
                    <TextThemed theme={theme}>Settings</TextThemed>
                </MenuOption>
                <MenuOption>
                    <TextThemed theme={theme}>Manage account</TextThemed>
                </MenuOption>
                <MenuOption>
                    <TextThemed theme={theme}>Theme</TextThemed>
                    <ChevronRightIcon
                        size={18}
                        color={theme.colors.text}
                        style={{ marginLeft: "auto" }}
                    />
                </MenuOption>
                <MenuOption onSelect={logout}>
                    <TextThemed theme={theme}>Log out</TextThemed>
                </MenuOption>
            </MenuOptions>
        </Menu>
    );
}

export default observer(UserOverview);
