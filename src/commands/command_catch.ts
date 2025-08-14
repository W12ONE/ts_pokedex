import { PokeAPI, PokemonInfo } from "../api/pokeapi.js";
import { State } from "../state/state.js";

export const commandCatch = async (state: State): Promise<void> => {
  console.log(`Throwing a Pokeball at ${state.inputArg}...`);
  const pokemonInfo = await PokeAPI.fetchPokemonInfo(state.inputArg);

  const caught = tryCatch(pokemonInfo);

  if (caught) {
    state.pokedex[pokemonInfo.name] = pokemonInfo;
  }

  caught
    ? console.log(`You caught ${pokemonInfo.name}!`)
    : console.log(`The ${pokemonInfo.name} broke free!`);
};

function tryCatch(pokemonInfo: PokemonInfo): boolean {
  const MIN_CHANCE = 0.05; // floor so it's never impossible
  const rate = 0.005; // tweak for difficulty curve

  // Higher base_exp → smaller chance
  const chance = Math.max(
    MIN_CHANCE,
    Math.exp(-rate * pokemonInfo.base_experience)
  );

  return Math.random() < chance;
}
