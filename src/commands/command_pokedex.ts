import { State } from "../state/state.js";

export const commandPokedex = async (state: State) => {
  console.log("Your Pokedex:");
  if (Object.keys(state.pokedex).length <= 0) {
    console.log(
      "You haven't caught any pokemon yet. Catch some to show them here!"
    );
    return;
  }
  for (const pokemon of Object.keys(state.pokedex)) {
    console.log(` - ${pokemon}`);
  }
};
