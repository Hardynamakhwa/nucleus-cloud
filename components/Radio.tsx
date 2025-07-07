import clsx from "clsx";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Pressable, View } from "react-native";

const RadioGroupContext = createContext<{
    value: string;
    select(value: string): void;
} | null>(null);

function RadionGroup({ children }: PropsWithChildren) {
    const [value, setValue] = useState("");
    const select = (value: string) => {
        setValue(value);
    };
    return (
        <RadioGroupContext value={{ value, select }}>
            <View className="">{children}</View>
        </RadioGroupContext>
    );
}

function Radio({ value }: { value: string }) {
    const context = useContext(RadioGroupContext);
    if (!context) return;

    const isSelected = context.value === value;
    return (
        <Pressable
            onPress={() => {
                context.select(value);
            }}
            className={clsx(
                "flex h-6 w-6 items-center justify-center rounded-full border-2",
                {
                    "bg-card border-border": isSelected,
                }
            )}
        >
            <View
                className={clsx("h-3 w-3 rounded-full", {
                    "bg-text": isSelected,
                })}
            />
        </Pressable>
    );
}

export { Radio, RadionGroup };
