import { useContext } from "react";
import { ContextMenuContext } from "../layouts/ContextMenuLayout";

export default function useContextMenu() {
    const ctx = useContext(ContextMenuContext);
    if (!ctx) {
        throw Error("useContextMenu should be used inside ContextMenuProvider");
    }
    return ctx;
}
