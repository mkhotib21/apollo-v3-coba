import { useQuery } from "@apollo/client";

import useIntersect from "../../helpers/useIntersect";
import { GET_POKEMONS } from "./queries/getPokemonAndAbilities";

const Pagination = () => {
  const { data, fetchMore, loading } = useQuery(GET_POKEMONS, {
    variables: { offset: 0 },
  });
  const { pokemons } = data || {};

  const { results: pokemonResults, nextOffset } = pokemons || {};

  const paginationRef = useIntersect(async () => {
    if (pokemonResults?.length && !loading) {
      fetchMore({ variables: { offset: nextOffset } });
    }
  });

  return (
    <div>
      <div style={{ flex: 1, minHeight: "100vh" }}>
        {pokemonResults?.map((pokemon: any) => (
          <div
            key={pokemon.url}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src={pokemon.image} />
            {pokemon.name}
          </div>
        ))}
      </div>
      <div ref={paginationRef}>Loading.....</div>
    </div>
  );
};

export default Pagination;
