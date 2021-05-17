import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";

const TOKEN = "TOKEN";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient<NormalizedCacheObject>({
  link: authLink.concat(httpLink as any) as any,
  cache: new InMemoryCache(),
});

export default client;
