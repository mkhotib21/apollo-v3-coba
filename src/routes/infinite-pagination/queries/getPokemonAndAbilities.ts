import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query getPokemons($offset: Int) {
    pokemons(offset: $offset) @connection(key: "infinite") {
      count
      nextOffset
      results {
        id
        name
        url
        image
      }
    }
  }
`;
