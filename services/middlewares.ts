import { ApolloLink } from "@apollo/client";
import { AuthStore } from "../stores/auth";

export const graphqlAuthMiddleware = new ApolloLink((operation, forward) => {
    const token = AuthStore.getTokenSync();
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: `Bearer ${token?.accessToken}`,
        },
    }));
    return forward(operation);
});
