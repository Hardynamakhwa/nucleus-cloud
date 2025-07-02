import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PixelRatio } from "react-native";
import { useIsSignedIn, useIsSignedOut } from "./hooks/useAuth";
import FolderPage from "./pages/Folder";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import SettingsGeneralTab from "./pages/Settings/General";
import SettingsNotificationsTab from "./pages/Settings/Notifications";
import SettingsSecurityTab from "./pages/Settings/Security";
import ChangePasswordPage from "./pages/modals/ChangePassword";
import SearchPage from "./pages/modals/Search";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Folder: {
        id: string;
        name?: string;
    };
    Settings: undefined;
    ChangePassword: undefined;
    Search: undefined;
};

const SettingsTabs = createMaterialTopTabNavigator({
    screens: {
        SettingsGeneral: {
            screen: SettingsGeneralTab,
            options: { title: "General" },
        },
        SettingsSecurity: {
            screen: SettingsSecurityTab,
            options: { title: "Security" },
        },
        SettingsNotifications: {
            screen: SettingsNotificationsTab,
            options: { title: "Notifications" },
        },
    },
    screenOptions: ({ theme }) => ({
        tabBarItemStyle: { width: "auto" },
        tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
            marginHorizontal: 16,
        },
    }),
    initialRouteName: "SettingsGeneral",
});

const RootStack = createNativeStackNavigator({
    groups: {
        LoggedOut: {
            if: useIsSignedOut,
            screens: {
                Login: LoginPage,
                Register: RegisterPage,
            },
            screenOptions: {
                title: "",
                headerTitleStyle: {
                    fontFamily: "RoobertBold",
                    fontSize: 26 * PixelRatio.getFontScale(),
                },
                animation: "slide_from_right",
            },
        },
        LoggedIn: {
            if: useIsSignedIn,
            screens: {
                Home: {
                    screen: HomePage,
                    options: { title: "" },
                },
                Folder: FolderPage,
                Settings: SettingsTabs,
                ChangePassword: {
                    screen: ChangePasswordPage,
                    options: { presentation: "modal" },
                },
                Search: {
                    screen: SearchPage,
                    options: { 
                        presentation: "modal",
                        animation: "fade" 
                    },
                },
            },
            screenOptions: {
                animation: "slide_from_right",
            },
        },
    },
    screenOptions: ({ theme }) => ({
        headerTitleStyle: {
            fontFamily: "RoobertMedium",
        },
        headerStyle: {
            backgroundColor: theme.colors.background,
        },
    }),
});

export const Navigation = createStaticNavigation(RootStack);
