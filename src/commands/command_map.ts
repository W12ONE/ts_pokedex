import { State } from "../state/state.js";

export const commandMap = async (state: State): Promise<void> => {
  for (const res of Object.values(state.mapInfo.results)) {
    console.log(res.name);
  }
};
