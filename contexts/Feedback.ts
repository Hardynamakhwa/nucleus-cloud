import { createContext } from "react";
import { SnackbarProps } from "../components/Snackbar";

const FeedbackContext = createContext<{
    snackbar: {
        data: SnackbarProps | null;
        show(
            message: string,
            opts: Omit<SnackbarProps, "message">,
            duration?: number
        ): void;
    };
} | null>(null);
export default FeedbackContext;
