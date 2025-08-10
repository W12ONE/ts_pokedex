import { PokeAPI } from "../api/pokeapi.js";
import { State } from "../state/state.js";
import { commandMap } from "./command_map.js";

export const commandMapn = async (state: State): Promise<void> => {
  const next = state.mapInfo.next;

  if (!next) {
    console.log("You are on the last page!");
  } else {
    state.mapInfo = await PokeAPI.fetchLocations(next);
    commandMap(state);
  }
};
