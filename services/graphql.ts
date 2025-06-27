import {
    ApolloClient,
    ApolloLink,
    concat,
    from,
    HttpLink,
    InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { AuthStore } from "../stores/auth";

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

const errorLink = onError(({ graphQLErrors, networkError }) => {
    const isNetwork401 =
        networkError
        && "statusCode" in networkError
        && networkError.statusCode === 401;
    const isGraphQLError401 = graphQLErrors?.some(
        (error) => error.extensions?.code === "UNAUTHENTICATED"
    );
    if (isNetwork401 || isGraphQLError401) {
        // return new Promise((resolve, reject) => {});
        console.log("Unauthorized access detected. Redirecting to login...");
    }
});

const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
});

export default client;
