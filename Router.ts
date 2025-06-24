import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useIsSignedIn, useIsSignedOut } from "./hooks/useAuth";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

const RootStack = createNativeStackNavigator({
    groups: {
        LoggedOut: {
            if: useIsSignedOut,
            screens: {
                Login: LoginPage,
            },
        },
        LoggedIn: {
            if: useIsSignedIn,
            screens: {
                Home: HomePage,
            },
        },
    },
});

export const Navigation = createStaticNavigation(RootStack);
