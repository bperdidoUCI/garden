import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URI || 'http://localhost:10000/graphql',
  cache: new InMemoryCache(),
});

export default client;
