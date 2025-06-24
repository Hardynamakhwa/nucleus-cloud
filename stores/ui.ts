import { makeObservable, observable } from "mobx";

enum display {
    LIST,
    LIST_COMPACT,
    GRID,
}

export class UiStore {
    display: display = display.LIST;

    constructor() {
        makeObservable(this, {
            display: observable,
        });
    }
}
