import { PokeAPI } from "../api/pokeapi.js";
import { State } from "../state/state.js";

export const commandExplore = async (
  state: State,
  locationName: string
): Promise<void> => {
  const encounters = await PokeAPI.fetchLocationInfo(locationName);

  console.log(`Exploring ${locationName} ...`);
  console.log("Found:");
  for (const res of Object.values(encounters)) {
    console.log(res.name);
  }
};
