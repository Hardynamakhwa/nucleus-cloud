import { useContext } from "react";
import FeedbackContext from "../contexts/Feedback";

export default function useFeedback() {
    const ctx = useContext(FeedbackContext);
    if (!ctx)
        throw new Error("useFeedback should be wrapped in FeedbackContext");
    return ctx;
}
