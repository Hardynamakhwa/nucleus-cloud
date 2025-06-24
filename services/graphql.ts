import { ApolloClient, concat, HttpLink, InMemoryCache } from "@apollo/client";
import { graphqlAuthMiddleware } from "./middlewares";

const httpLink = new HttpLink({
    uri: "http://localhost:8000/graphql",
});

const client = new ApolloClient({
    link: concat(graphqlAuthMiddleware, httpLink),
    cache: new InMemoryCache(),
    
});

export default client;
