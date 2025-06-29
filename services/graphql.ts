import {
    ApolloClient,
    ApolloLink,
    from,
    fromPromise,
    HttpLink,
    InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { AuthStore } from "../stores/auth";
import api from "./axios";

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
                } catch {
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
    return forward(operation);
});

const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
});

export default client;
