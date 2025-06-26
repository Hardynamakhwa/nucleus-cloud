import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useIsSignedIn, useIsSignedOut } from "./hooks/useAuth";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import FolderPage from "./pages/Folder";
import SettingsPage from "./pages/Settings";
import RegisterPage from "./pages/Register";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Folder: {
        id: string;
        name?: string;
    };
    Settings: undefined;
};

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
                Settings: SettingsPage,
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
