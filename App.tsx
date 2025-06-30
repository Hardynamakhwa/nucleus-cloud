import "./services/folder.effects";
import { ApolloProvider } from "@apollo/client";
import * as Font from "expo-font";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MenuProvider } from "react-native-popup-menu";
import { Navigation } from "./Router";
import SignInProvider from "./contexts/SignIn";
import "./global.css";
import client from "./services/graphql";
import store from "./stores";
import { colorScheme } from "./stores/ui";
import { darkTheme, lightTheme } from "./themes/schemes";
import * as SplashScreen from "expo-splash-screen";
import { setBackgroundColorAsync } from "expo-system-ui";

SplashScreen.preventAutoHideAsync();
function App() {
    const schemeName = useColorScheme();
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        const setup = async () => {
            try {
                await Font.loadAsync({
                    RoobertBold: require("./assets/fonts/Roobert-Bold.otf"),
                    RoobertMedium: require("./assets/fonts/Roobert-Medium.otf"),
                    MontrealRegular: require("./assets/fonts/NeueMontreal-Regular.otf"),
                    MontrealMedium: require("./assets/fonts/NeueMontreal-Medium.otf"),
                    NeueMontrealBold: require("./assets/fonts/NeueMontreal-Bold.otf"),
                    NeueMontrealLight: require("./assets/fonts/NeueMontreal-Light.otf"),
                    RoobertHeavy: require("./assets/fonts/Roobert-Heavy.otf"),
                    RoobertLight: require("./assets/fonts/Roobert-Light.otf"),
                    RoobertRegular: require("./assets/fonts/Roobert-Regular.otf"),
                    RoobertSemiBold: require("./assets/fonts/Roobert-SemiBold.otf"),
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        };
        setup();
    }, []);

    const prefersDark =
        store.ui.colorScheme === colorScheme.DARK
        || (store.ui.colorScheme === colorScheme.SYSTEM
            && schemeName === colorScheme.DARK);

    const theme = useMemo(
        () => (prefersDark ? darkTheme : lightTheme),
        [prefersDark]
    );

    useEffect(() => {
        const bootstrap = async () => {
            setBackgroundColorAsync(theme.colors.background);
        };
        bootstrap();
    }, [theme.colors.background]);

    const onLayoutRootView = useCallback(() => {
        if (appIsReady) {
            SplashScreen.hide();
        }
    }, [appIsReady]);

    if (!appIsReady || (store.auth.loading && store.auth.user === null)) {
        return null;
    }

    return (
        <SignInProvider>
            <ApolloProvider client={client}>
                <GestureHandlerRootView
                    onLayout={onLayoutRootView}
                    style={{ flex: 1 }}
                >
                    <MenuProvider>
                        <Navigation theme={theme} />
                    </MenuProvider>
                </GestureHandlerRootView>
            </ApolloProvider>
        </SignInProvider>
    );
}
export default observer(App);
