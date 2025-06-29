import { usePreventRemove } from "@react-navigation/native";
import { useEffect } from "react";
import { BackHandler } from "react-native";

export default function useBackHandler(
    prevent: boolean,
    callback?: () => void
) {
    usePreventRemove(prevent, () => {
        if (prevent) callback?.();
    });
    useEffect(() => {
        const subscription = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                if (prevent) callback?.();
                return prevent;
            }
        );
        return subscription.remove;
    }, [callback, prevent]);
}
