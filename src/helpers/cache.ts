import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemons: {
          keyArgs(_, context) {
            console.log(context);
            const connection =
              // @ts-ignore
              context.field?.directives?.[0]?.arguments?.[0]?.value?.value;
            switch (connection) {
              case "infinite":
                return ["@connection", ["key"]];
              default:
                return false;
            }
          },
          merge: (prev, fetchMoreResult: any, { args, field }) => {
            const connectionName =
              // @ts-ignore
              field?.directives?.[0]?.arguments?.[0]?.value?.value;
            if (!prev || connectionName !== "infinite") return fetchMoreResult;
            const mergedResult = {
              ...fetchMoreResult,
              results: [...prev.results, ...fetchMoreResult.results],
            };
            return mergedResult;
          },
        },
      },
    },
    PokemonItem: {
      keyFields: ["image"],
    },
    BaseName: {
      keyFields: ["id", "name"],
    },
  },
});
