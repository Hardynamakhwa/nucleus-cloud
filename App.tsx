import { Navigation } from "./Router";
import SignInProvider from "./contexts/SignIn";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { observer } from "mobx-react-lite";
import store from "./stores";
import { ApolloProvider } from "@apollo/client";
import client from "./services/graphql";

function App() {
    if (store.auth.loading && store.auth.user === null) {
        return null;
    }

    return (
        <SignInProvider>
            <ApolloProvider client={client}>
                <GestureHandlerRootView>
                    <Navigation />
                </GestureHandlerRootView>
            </ApolloProvider>
        </SignInProvider>
    );
}
export default observer(App);
