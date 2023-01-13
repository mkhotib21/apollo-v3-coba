import { useQuery } from "@apollo/client";
import { cache } from "../../helpers/cache";

import useIntersect from "../../helpers/useIntersect";
import { GET_POKEMONS } from "./queries/getPokemonAndAbilities";

const Pagination = () => {
  const { data, fetchMore, loading } = useQuery(GET_POKEMONS, {
    variables: { offset: 0 },
  });
  const { pokemons2 } = data || {};

  const { results: pokemonResults, nextOffset } = pokemons2 || {};

  const paginationRef = useIntersect(async () => {
    const existing: any = cache.readQuery({
      query: GET_POKEMONS,
      variables: { offset: 0 },
    });

    if (pokemonResults?.length && !loading) {
      const { data: newData, error } = await fetchMore({
        variables: { offset: nextOffset },
      });
      if (!error) {
        cache.writeQuery({
          query: GET_POKEMONS,
          data: {
            ...newData,
            pokemons2: {
              ...newData.pokemons2,
              results: [
                ...existing.pokemons2.results,
                ...newData.pokemons2.results,
              ],
            },
          },
        });
      }
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
            <img src={pokemon.image} alt={pokemon.name} />
            {pokemon.name}
          </div>
        ))}
      </div>
      <div ref={paginationRef}>Loading.....</div>
    </div>
  );
};

export default Pagination;
