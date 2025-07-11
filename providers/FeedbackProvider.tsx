import { PropsWithChildren, useMemo, useRef, useState } from "react";
import FeedbackContext from "../contexts/Feedback";
import { SnackbarProps } from "../components/Snackbar";

export default function FeedbackProvider({ children }: PropsWithChildren) {
    const [snackbarState, setSnackbarState] = useState<SnackbarProps | null>(
        null
    );
    const snackbarTimeoutRef = useRef<NodeJS.Timeout>(null);

    const snackbar = useMemo(
        () => ({
            show: (
                message: string,
                opts: Omit<SnackbarProps, "message">,
                duration: number = 5000
            ) => {
                setSnackbarState({ message, ...opts });

                snackbarTimeoutRef.current = setTimeout(() => {
                    setSnackbarState(null);
                }, duration);
            },
            data: snackbarState,
        }),
        [snackbarState]
    );

    return (
        <FeedbackContext.Provider value={{ snackbar: snackbar }}>
            {children}
        </FeedbackContext.Provider>
    );
}
