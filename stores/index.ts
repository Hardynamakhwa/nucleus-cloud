import { AuthStore } from "./auth";

class Store {
    auth: AuthStore;
    constructor() {
        this.auth = new AuthStore();
    }
}

const store = new Store();
export default store;
