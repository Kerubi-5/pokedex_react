import { IPokemon } from "../types";
import { ReturnValue } from "../usePokemon";
// Pokemon sprites
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png

const normalizePokemon = (pokemons: ReturnValue) => {
  const result = pokemons.results.map((pokemon) => {
    // Gets the last part of the url segment for the id between
    // Example: https://pokeapi.co/api/v2/pokemon/2/
    // This will get /2/
    // replaceAll will remove the "/" from the id
    const regex = /\/([0-9]*[\/]?)$/;
    const id = pokemon.url.match(regex)?.[0].replaceAll("/", "");

    return {
      ...pokemon,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    } as IPokemon;
  });

  return {
    next: pokemons.next,
    prev: pokemons.prev,
    pokemons: result,
  };
};

export default normalizePokemon;
