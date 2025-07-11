import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PixelRatio, StyleSheet } from "react-native";
import { FileType, FolderType } from "./__generated__/schemas/graphql";
import { useIsSignedIn, useIsSignedOut } from "./hooks/useAuth";
import ContextMenuLayout from "./layouts/ContextMenuLayout";
import ManagePermissionsLayout from "./layouts/ManagePermissionsLayout";
import FolderPage from "./pages/Folder";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import SettingsGeneralTab from "./pages/Settings/General";
import SettingsNotificationsTab from "./pages/Settings/Notifications";
import SettingsSecurityTab from "./pages/Settings/Security";
import ChangePasswordPage from "./pages/modals/ChangePassword";
import SearchPage from "./pages/modals/Search";
import ManagePermissionsLinksTab from "./pages/ManagePermissions/Links";
import ManagePermissionsPeopleTab from "./pages/ManagePermissions/People";
import Share from "./pages/modals/Share";
import FeedbackLayout from "./layouts/FeedbackLayout";
import CopierPage from "./pages/Copier";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Folder: {
        id: string;
        name?: string;
    };
    Settings: undefined;
    ManagePermissions: { resource: FileType | FolderType };
    Share: {
        resource: FileType | FolderType;
    };
    Copier: {
        resource: FileType | FolderType;
        targetFolder?: {
            id: string;
            name?: string;
        };
    };
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
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.colors.border,
            marginHorizontal: 16,
        },
    }),
    initialRouteName: "SettingsGeneral",
});

const ManagePermissionsTabs = createMaterialTopTabNavigator({
    screens: {
        ManagePermissionsPeople: {
            screen: ManagePermissionsPeopleTab,
            options: { title: "People" },
        },
        ManagePermissionsLinks: {
            screen: ManagePermissionsLinksTab,
            options: { title: "Links" },
        },
    },
    screenOptions: ({ theme }) => ({
        tabBarItemStyle: { width: "auto" },
        tabBarLabelStyle: {
            fontFamily: "MontrealMedium",
        },
        tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.colors.border,
            marginHorizontal: 16,
        },
    }),
    initialRouteName: "ManagePermissionsPeople",
    layout: ManagePermissionsLayout,
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
                Folder: {
                    screen: FolderPage,
                },
                ManagePermissions: {
                    screen: ManagePermissionsTabs,
                    options: { title: "" },
                    initialParams: {
                        resource: null,
                    },
                },
                Settings: SettingsTabs,
                ChangePassword: ChangePasswordPage,
                Copier: {
                    screen: CopierPage,
                    initialParams: { resource: null, targetFolder: null },
                },
            },
            screenOptions: {
                animation: "slide_from_right",
            },
        },
        LoggedInModals: {
            if: useIsSignedIn,
            screens: {
                Share: Share,
                Search: SearchPage,
            },
            screenOptions: {
                presentation: "modal",
                animation: "fade",
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
    layout: (props) => FeedbackLayout({ children: ContextMenuLayout(props) }),
});

export const Navigation = createStaticNavigation(RootStack);
