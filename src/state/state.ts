import { Interface, createInterface } from "readline";
import { ShallowLocations, PokeAPI, LocationPokemon } from "../api/pokeapi.js";
import { getCommands } from "../repl/repl.js";

export type State = {
  rl: Interface;
  registry: Record<string, CLICommand>;
  mapInfo: ShallowLocations;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export const initState = async (): Promise<State> => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const commands = getCommands();
  const mapInfo = await PokeAPI.fetchLocations();

  return {
    rl: rl,
    registry: commands,
    mapInfo: mapInfo,
  };
};
