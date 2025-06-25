import { observer } from "mobx-react-lite";
import { createContext, PropsWithChildren } from "react";
import store from "../stores";
import { User } from "../stores/auth";

interface SignInStatus {
    authenticated: boolean;
    loading: boolean;
    user: User | null;
}

export const SignInContext = createContext<SignInStatus>({
    authenticated: false,
    loading: false,
    user: null,
});

function SignInProvider({ children }: PropsWithChildren) {
    const auth = {
        authenticated: store.auth.authenticated,
        loading: store.auth.loading,
        user: store.auth.user,
    };
    return (
        <SignInContext.Provider value={auth}>{children}</SignInContext.Provider>
    );
}

export default observer(SignInProvider);
