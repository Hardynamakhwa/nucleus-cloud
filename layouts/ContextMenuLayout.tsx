import { createContext, useCallback, useEffect, useRef, useState } from "react";
import ListItemContextMenu from "../partials/ListItemContextMenu";
import BottomSheet from "@gorhom/bottom-sheet";
import { FolderUnionFile } from "../partials/List";

interface ContextMenuState<T = FolderUnionFile> {
    item: T | null;
    show(item: T): Promise<any>;
}

export const ContextMenuContext = createContext<ContextMenuState | null>(null);

export default function ContextMenuLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const ref = useRef<BottomSheet>(null);
    const resolver = useRef<(value: any) => void>(null);
    const [item, setItem] = useState<ContextMenuState["item"]>(null);

    const show: ContextMenuState["show"] = useCallback((item) => {
        setItem(item);
        return new Promise((resolve) => {
            resolver.current = resolve;
        });
    }, []);

    useEffect(() => {
        if (item) ref.current?.expand();
    }, [item]);

    const onSelect = (value: any) => {
        resolver.current?.(value);
        if (resolver.current) {
            ref.current?.close();
            resolver.current = null;
        }
        setItem(null);
    };

    return (
        <ContextMenuContext.Provider value={{ show, item }}>
            {children}
            <ListItemContextMenu
                ref={ref}
                item={item}
                onSelect={onSelect}
                onDismiss={() => onSelect(null)}
            />
        </ContextMenuContext.Provider>
    );
}
