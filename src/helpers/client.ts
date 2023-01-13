// Mocky not unique
// https://run.mocky.io/v3/08387686-4824-4266-9a07-9f16243b3db7
// Pokemon GQL

import { ApolloClient } from "@apollo/client";
import { cache } from "./cache";

// https://graphql-pokeapi.graphcdn.app/
export const client = new ApolloClient({
  uri: "https://graphql-pokeapi.graphcdn.app/",
  ssrMode: false,
  cache,
});
