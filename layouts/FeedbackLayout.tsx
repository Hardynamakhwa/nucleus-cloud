import { PropsWithChildren } from "react";
import Snackbar from "../components/Snackbar";
import useFeedback from "../hooks/useFeedback";

export default function FeedbackLayout({ children }: PropsWithChildren) {
    const { snackbar } = useFeedback();

    return (
        <>
            {children}
            {snackbar.data && (
                <Snackbar
                    message={snackbar.data.message}
                    action={snackbar.data.action}
                    animationDuration={snackbar.data.animationDuration}
                    onAction={snackbar.data.onAction}
                    variant={snackbar.data.variant}
                />
            )}
        </>
    );
}
