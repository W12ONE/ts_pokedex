import { Cache } from "../cache/pokecache.js";

const BASE_URL = "https://pokeapi.co/api/v2";
const _cache = new Cache(600000); // 10 minutes

export const PokeAPI = {
  fetchLocations: (pageURL?: string): Promise<ShallowLocations> => {
    const url = pageURL || `${BASE_URL}/location-area`;

    const cached = _cache.get<Promise<ShallowLocations>>(url);
    if (cached) {
      console.log("Cache Hit!");
      return cached.val;
    }

    const promise = fetch(url).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch locations");
      return res.json() as Promise<ShallowLocations>;
    });

    _cache.add(url, promise);
    return promise;
  },

  fetchLocationInfo: (locationName: string): Promise<LocationPokemon> => {
    const url = `${BASE_URL}/location-area/${locationName}`;

    const cached = _cache.get<Promise<LocationPokemon>>(url);
    if (cached) {
      console.log("Cache Hit!");
      return cached.val;
    }

    const promise = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch locationData");
        return res.json();
      })
      .then((json) => {
        const data = json as LocationInfoApiReturn;
        return data.pokemon_encounters.map((e) => e.pokemon);
      });

    _cache.add(url, promise);
    return promise;
  },

  fetchPokemonInfo: (pokemonName: string): Promise<PokemonInfo> => {
    const url = `${BASE_URL}/pokemon/${pokemonName}`;

    const cached = _cache.get<Promise<PokemonInfo>>(url);
    if (cached) {
      console.log("Cache Hit!");
      return cached.val;
    }

    const promise = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch pokemonData");
        return res.json();
      })
      .then((json) => {
        return {
          base_experience: json.base_experience,
          name: json.name,
          height: json.height,
          weight: json.weight,
          stats: json.stats.map((s: any) => ({
            name: s.stat.name,
            base_stat: s.base_stat,
          })),
          types: json.types.map((t: any) => ({ name: t.type.name })),
        } as PokemonInfo;
      });

    _cache.add(url, promise);
    return promise;
  },
};

// --- Types ---
export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
};

export type Result = {
  name: string;
  url: string;
};

export type Pokemon = {
  name: string;
  url: string;
};

export type LocationPokemon = Pokemon[];

export type LocationInfoApiReturn = {
  pokemon_encounters: {
    pokemon: Pokemon;
  }[];
};

export type PokemonInfo = {
  base_experience: number;
  height: number;
  name: string;
  stats: {
    name: string;
    base_stat: number;
  }[];
  types: {
    name: string;
  }[];
  weight: number;
};
