import { State } from "../state/state.js";

export const commandCatch = async (
  state: State,
  pokemonName: string
): Promise<void> => {
  console.log(`Throwing a Pokeball at ${pokemonName}`);
};
