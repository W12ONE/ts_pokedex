import { State } from "../state/state.js";

export const commandHelp = async (state: State): Promise<void> => {
  console.log("Welcome to the Pokedex!");
  console.log("Usage: \n");
  for (const cmd of Object.values(state.registry)) {
    console.log(`${cmd.name}: ${cmd.description}`);
  }
};
