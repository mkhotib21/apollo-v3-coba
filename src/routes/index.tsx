import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "./queries/getPokemonAndAbilities";

const Routes = () => {
  const { data } = useQuery(GET_POKEMONS);
  const { pokemons, abilities, berries } = data || {};
  const { results: pokemonResults } = pokemons || {};
  const { results: berryResults } = berries || {};
  const { results: abilityResults } = abilities || {};

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
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
      <div style={{ flex: 1 }}>
        {abilityResults?.map((ability: any) => (
          <div
            key={ability.id}
            style={{ display: "flex", alignItems: "center" }}
          >
            {ability.name}
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        {berryResults?.map((ability: any) => (
          <div
            key={ability.id}
            style={{ display: "flex", alignItems: "center" }}
          >
            {ability.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Routes;
