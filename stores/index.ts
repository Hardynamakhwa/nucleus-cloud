import { AuthStore } from "./auth";
import { UiStore } from "./ui";

class Store {
    auth: AuthStore;
    ui: UiStore;
    constructor() {
        this.auth = new AuthStore();
        this.ui = new UiStore();
    }
}

const store = new Store();
export default store;
