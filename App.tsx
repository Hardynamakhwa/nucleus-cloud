import "./global.css";
import { ApolloProvider } from "@apollo/client";
import * as SystemUI from "expo-system-ui";
import { observer } from "mobx-react-lite";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MenuProvider } from "react-native-popup-menu";
import { Navigation } from "./Router";
import SignInProvider from "./contexts/SignIn";
import client from "./services/graphql";
import store from "./stores";
import { darkTheme, lightTheme } from "./themes/schemes";
import { colorScheme } from "./stores/ui";
import { useColorScheme } from "react-native";
import { useMemo } from "react";

SystemUI.setBackgroundColorAsync("black");
function App() {
    const schemeName = useColorScheme();

    const prefersDark =
        store.ui.colorScheme === colorScheme.DARK
        || (store.ui.colorScheme === colorScheme.SYSTEM
            && schemeName === colorScheme.DARK);

    const theme = useMemo(
        () => (prefersDark ? darkTheme : lightTheme),
        [prefersDark],
    );

    if (store.auth.loading && store.auth.user === null) {
        return null;
    }

    return (
        <SignInProvider>
            <ApolloProvider client={client}>
                <GestureHandlerRootView>
                    <MenuProvider>
                        <Navigation theme={theme} />
                    </MenuProvider>
                </GestureHandlerRootView>
            </ApolloProvider>
        </SignInProvider>
    );
}
export default observer(App);
