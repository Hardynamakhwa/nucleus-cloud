import { useContext } from "react";
import { SignInContext } from "../contexts/SignIn";

export default function useAuth() {
    const ctx = useContext(SignInContext);
    return ctx;
}

export function useIsSignedIn() {
    const auth = useAuth();
    return auth.authenticated;
}

export function useIsSignedOut() {
    return !useIsSignedIn();
}
