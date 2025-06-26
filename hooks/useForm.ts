import { useState, useCallback } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

type FormValue = string | number | boolean | null;
type FormState<T extends FormValue = string> = {
    [field: string]: T;
};

function useForm<T extends FormValue = string>() {
    const [form, mutateForm] = useState<FormState<T>>({});

    const changeHandler = useCallback((value: T, field: string) => {
        mutateForm((curr) => ({ ...curr, [field]: value }));
    }, []);

    const subscribe = useCallback(
        (field: string, init: T) => {
            mutateForm((curr) => {
                if (field in curr) return curr;
                return { ...curr, [field]: init };
            });
            return {
                value: form[field],
                onChange: (
                    valueOrEvent:
                        | T
                        | NativeSyntheticEvent<TextInputChangeEventData>
                ) => {
                    const value =
                        (
                            valueOrEvent
                            && typeof valueOrEvent === "object"
                            && "nativeEvent" in valueOrEvent
                        ) ?
                            valueOrEvent.nativeEvent.text
                        :   valueOrEvent;
                    changeHandler(value as T, field);
                },
            };
        },
        [changeHandler, form]
    );

    const reset = () => mutateForm({});

    return { subscribe, form, reset };
}

export default useForm;
