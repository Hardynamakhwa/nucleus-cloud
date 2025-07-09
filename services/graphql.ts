import {
    ApolloClient,
    ApolloLink,
    from,
    fromPromise,
    HttpLink,
    InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { mergeDeep } from "@apollo/client/utilities";
import { isAxiosError } from "axios";
import api from "./axios";
import {AuthStore} from "../stores/auth";
import store from "../stores";

const httpLink = new HttpLink({
    uri: "http://localhost:8000/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
    const token = AuthStore.getTokenSync();
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: `Bearer ${token?.accessToken}`,
        },
    }));
    return forward(operation);
});

const errorLink = onError(({ graphQLErrors, forward, operation }) => {
    const unauthenticated = graphQLErrors?.some(
        (error) => error.extensions?.code === "UNAUTHENTICATED"
    );
    if (unauthenticated) {
        return fromPromise(
            (async () => {
                const tokenData = await AuthStore.getToken();
                const refreshToken = tokenData?.refreshToken;

                if (!refreshToken) return null;

                try {
                    const { data } = await api.post("/refresh", {
                        refresh_token: refreshToken,
                    });

                    if (!data?.refresh_token) return null;

                    await AuthStore.setToken({
                        accessToken: data.access_token,
                        refreshToken: data.refresh_token,
                        tokenType: data.token_type,
                    });
                    return data.access_token;
                } catch (e) {
                    if (isAxiosError(e)) {
                        if (e.response?.status === 401) {
                            store.auth.logout();
                        }
                    }
                    return null;
                }
            })()
        )
            .filter((token) => Boolean(token))
            .flatMap((token) => {
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                    headers: {
                        ...oldHeaders,
                        authorization: `Bearer ${token}`,
                    },
                });
                return forward(operation);
            });
    }
});

const retryLink = new RetryLink({
    delay: {
        initial: 300,
        max: Infinity,
        jitter: true,
    },
    attempts: {
        max: 5,
        retryIf: (error) => !!error.networkError,
    },
});

const client = new ApolloClient({
    link: from([retryLink, errorLink, authLink, httpLink]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    folder: {
                        merge(existing = {}, incoming) {
                            return mergeDeep(existing, incoming);
                        },
                    },
                },
            },
            FolderQueries: {
                fields: {
                    getAll: {
                        keyArgs: false,
                        merge: (_, incoming) => incoming,
                    },
                    get: {
                        keyArgs: ["id"],
                    },
                },
            },
        },
    }),
});

export default client;
