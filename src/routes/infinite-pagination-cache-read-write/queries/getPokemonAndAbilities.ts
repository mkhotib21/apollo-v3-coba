import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query getPokemons($offset: Int) {
    pokemons2: pokemons(offset: $offset) {
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
