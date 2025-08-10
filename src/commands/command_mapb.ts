import { PokeAPI } from "../api/pokeapi.js";
import { State } from "../state/state.js";
import { commandMap } from "./command_map.js";

export const commandMapb = async (state: State): Promise<void> => {
  const previous = state.mapInfo.previous;

  if (!previous) {
    console.log("You are on the first page!");
  } else {
    state.mapInfo = await PokeAPI.fetchLocations(previous);
    commandMap(state);
  }
};
