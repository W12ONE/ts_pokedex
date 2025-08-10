import { PokeAPI } from "../api/pokeapi.js";
import { State } from "../state/state.js";

export const commandExplore = async (state: State): Promise<void> => {
  const encounters = await PokeAPI.fetchLocationInfo(state.inputArg);

  console.log(`Exploring ${state.inputArg} ...`);
  console.log("Found:");
  for (const res of Object.values(encounters)) {
    console.log(res.name);
  }
};
