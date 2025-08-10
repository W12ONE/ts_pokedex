import { commandMapn } from "../commands/command_mapn.js";
import { commandExit } from "../commands/command_exit.js";
import { commandHelp } from "../commands/command_help.js";
import { commandMap } from "../commands/command_map.js";
import { CLICommand, State } from "../state/state.js";
import { commandMapb } from "../commands/command_mapb.js";
import { commandExplore } from "../commands/command_explore.js";
import { commandCatch } from "../commands/command_catch.js";

export const startREPL = async (state: State) => {
  const rl = state.rl;
  const commands = state.registry;

  console.log("Welcome to the PokeDex");
  rl.prompt();
  rl.on("line", async (input) => {
    const cleanedInput = cleanInput(input);
    state.inputCommand = cleanedInput[0];
    state.inputArg = cleanedInput[1];

    if (!state.inputCommand) {
      rl.prompt();
      return;
    }

    const command = commands[state.inputCommand];

    if (!command) {
      console.log("Unknown command");
    } else {
      try {
        await command.callback(state);
      } catch (err) {
        console.error("An error occurred while executing the command:", err);
      }
    }
    rl.prompt();
  });
};

export const getCommands = (): Record<string, CLICommand> => {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Display 20 locations",
      callback: commandMap,
    },
    mapn: {
      name: "mapn",
      description: "Display the next 20 locations",
      callback: commandMapn,
    },
    mapb: {
      name: "mapb",
      description: "Dispaly the previous 20 locations",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Explore a location",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Catch a Pokemon",
      callback: commandCatch,
    },
  };
};

export const cleanInput = (input: string): Array<string> => {
  return input.trim().split(" ");
};
