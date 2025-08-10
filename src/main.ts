import { startREPL } from "./repl/repl.js";
import { initState } from "./state/state.js";

async function main() {
  const state = await initState();
  await startREPL(state);
}

main();
