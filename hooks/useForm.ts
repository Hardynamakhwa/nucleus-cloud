import { useState, useCallback } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

type FormValue = string | number | boolean | null;
type FormState<T extends FormValue = string> = {
    [field: string]: T;
};

function useForm<T extends FormValue = string>() {
    const [form, mutateForm] = useState<FormState<T>>({});

    const subscribe = (field: string, init: T) => {
        mutateForm((curr) => {
            if (field in curr) return curr;
            return { ...curr, [field]: init };
        });
        return {
            value: form[field],
            onChange: (
                valueOrEvent: T | NativeSyntheticEvent<TextInputChangeEventData>
            ) => {
                const value =
                    (
                        valueOrEvent
                        && typeof valueOrEvent === "object"
                        && "nativeEvent" in valueOrEvent
                    ) ?
                        valueOrEvent.nativeEvent.text
                    :   valueOrEvent;
                mutateForm((curr) => ({ ...curr, [field]: value as T }));
            },
        };
    };

    const reset = () => mutateForm({});

    return { subscribe, form, reset };
}

export default useForm;
