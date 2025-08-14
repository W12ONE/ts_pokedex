import { State } from "../state/state";

export const commandInspect = async (state: State) => {
  const inspectTarget = state.pokedex[state.inputArg];

  if (!inspectTarget) {
    console.log("Pokemon not caught yet!");
    return;
  }

  for (const [name, value] of Object.entries(inspectTarget)) {
    if (isStats(value)) {
      console.log("Stats:");
      value.forEach((s) => console.log(`  -${s.name}: ${s.base_stat}`));
    } else if (isTypes(value)) {
      console.log("Types:");
      value.forEach((t) => console.log(`  - ${t.name}`));
    } else {
      console.log(`${name.charAt(0).toUpperCase() + name.slice(1)}: ${value}`);
    }
  }
};

type Stat = { name: string; base_stat: number };
type PokeType = { name: string };

const isStats = (v: unknown): v is Stat[] =>
  Array.isArray(v) &&
  v.length > 0 &&
  typeof (v[0] as any).base_stat === "number";

const isTypes = (v: unknown): v is PokeType[] =>
  Array.isArray(v) &&
  v.length > 0 &&
  typeof (v[0] as any).name === "string" &&
  !("base_stat" in (v[0] as any));
