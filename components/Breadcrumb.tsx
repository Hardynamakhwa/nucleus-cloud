import {
    ScrollView,
    TouchableOpacity,
    Text,
    LayoutChangeEvent,
    useWindowDimensions,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";
import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";

type Crumb = { name: string; id: string };

interface BreadcrumbProps {
    crumbs: Crumb[];
    onPress?(crumb: Crumb): void;
}

export default function Breadcrumb({ crumbs, onPress }: BreadcrumbProps) {
    const scrollRef = useRef<ScrollView>(null);
    useLayoutEffect(() => {
        scrollRef.current?.scrollToEnd();
    }, []);
    return (
        <ScrollView
            horizontal
            className="h-6"
            contentContainerClassName="gap-x-1"
            snapToEnd
            ref={scrollRef}
        >
            {crumbs.map(({ id, name }, index: number, arr) => (
                <TouchableOpacity
                    key={id}
                    disabled={index === arr.length - 1}
                    onPress={() => onPress?.({ id, name })}
                    className={clsx("flex-row items-center gap-x-1", {
                        "opacity-75": index !== arr.length - 1,
                    })}
                >
                    {id !== "root" && <Text className="text-text">/</Text>}
                    <Text className="text-text">{name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
