import { action, makeObservable, observable } from "mobx";

export enum display {
    LIST,
    LIST_COMPACT,
    GRID,
}

export enum colorScheme {
    LIGHT = "light",
    DARK = "dark",
    SYSTEM = "system",
}

export class UiStore {
    display: display = display.LIST;
    colorScheme: colorScheme = colorScheme.SYSTEM;

    constructor() {
        makeObservable(this, {
            display: observable,
            colorScheme: observable,
            setColorScheme: action,
        });
    }

    setColorScheme(scheme: colorScheme) {
        this.colorScheme = scheme;
    }
}
