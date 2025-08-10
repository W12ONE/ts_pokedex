import { State } from "../state/state.js";

export const commandCatch = async (state: State): Promise<void> => {
  console.log(`Throwing a Pokeball at ${state.inputArg}`);
};
