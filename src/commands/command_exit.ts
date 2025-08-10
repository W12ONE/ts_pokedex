import { State } from "../state/state.js";

export const commandExit = async (state: State): Promise<void> => {
  console.log("Closing the Pokedex... Goodbye!");
  state.rl.close();
  process.exit(0);
};
