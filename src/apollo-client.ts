import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "" , 
  headers: {
    apikey: "", 
},
  cache: new InMemoryCache(),
});

export default client;
