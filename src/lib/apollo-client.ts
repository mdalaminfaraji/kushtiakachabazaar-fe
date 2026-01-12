import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, // e.g. https://api.example.com/graphql
  headers: {
    // optional auth
    // Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  },
});

export function createApolloClient() {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
}
