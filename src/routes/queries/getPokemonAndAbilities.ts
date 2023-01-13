import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query {
    pokemons {
      count
      next
      previous
      results {
        name
        url
        image
      }
    }
    abilities {
      count
      next
      results {
        id
        name
        url
      }
    }
    berries {
      results {
        id
        name
        url
      }
    }
  }
`;
