import { observer } from "mobx-react-lite";
import { createContext, PropsWithChildren } from "react";
import store from "../stores";

export const SignInContext = createContext({
    authenticated: false,
    loading: false,
});

function SignInProvider({ children }: PropsWithChildren) {
    const auth = {
        authenticated: store.auth.authenticated,
        loading: store.auth.loading,
    };
    return (
        <SignInContext.Provider value={auth}>{children}</SignInContext.Provider>
    );
}

export default observer(SignInProvider);
