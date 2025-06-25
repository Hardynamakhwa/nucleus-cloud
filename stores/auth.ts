import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from "mobx";
import * as SecureStore from "expo-secure-store";

export interface User {
    id?: string;
    email: string;
}

interface Token {
    accessToken: string;
    tokenType: string;
}

export class AuthStore {
    loading: boolean = false;
    token: Token | null = null;
    user: User | null = null;

    constructor() {
        makeObservable(this, {
            loading: observable,
            token: observable,
            user: observable,
            authenticated: computed,
            setup: action,
            login: action,
        });
        this.setup();
    }

    get authenticated() {
        return this.token !== null && this.user !== null;
    }

    async setup() {
        runInAction(() => {
            this.loading = true;
        });
        try {
            const token = await AuthStore.getToken();
            if (token) {
                const user = await this.getUser();
                runInAction(() => {
                    this.token = token;
                    this.user = user;
                });
            }
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async login(user: User, token: Token) {
        try {
            await AuthStore.setToken(token);
            await this.setUser(user);
        } finally {
            runInAction(() => {
                this.token = token;
                this.user = user;
            });
        }
    }

    private async getUser(): Promise<User | null> {
        const userStr = await SecureStore.getItemAsync("user");
        if (userStr) return JSON.parse(userStr) as User;
        return null;
    }

    private async setUser(user: User) {
        const userStr = JSON.stringify(user);
        await SecureStore.setItemAsync("user", userStr);
    }

    public static async getToken(): Promise<Token | null> {
        const tokenStr = await SecureStore.getItemAsync("token");
        if (tokenStr) return JSON.parse(tokenStr) as Token;
        return null;
    }

    public static getTokenSync(): Token | null {
        const tokenStr = SecureStore.getItem("token");
        if (tokenStr) return JSON.parse(tokenStr) as Token;
        return null;
    }

    public static async setToken(token: Token) {
        const tokenStr = JSON.stringify(token);
        await SecureStore.setItemAsync("token", tokenStr);
    }
}
