# Pokédex CLI

A simple command-line Pokédex that lets you catch, inspect, and list Pokémon using the [PokéAPI](https://pokeapi.co/).

## Features

- Catch Pokémon and add them to your local Pokédex  
- Inspect stats, types, height, and weight of caught Pokémon  
- List all Pokémon you’ve caught  
- In-memory caching to reduce API calls

## Installation

```bash
git https://github.com/W12ONE/ts_pokedex.git
cd ts_pokedex
npm install
```

## Usage

Start the Pokedex with:

```bash
npm run dev
```

### Commands

There is a `help` command to see all the available commands.

## Catch Rate Formula

The catch chance is derived from the Pokémon’s **base experience**:

```
chance = max(0.05, e^(-0.005 * base_experience))
```

- Higher base experience → lower chance of catching  
- Minimum catch chance is **5%**, so no Pokémon is impossible to catch

## Project Structure

```
src/
  api/               # Fetching
  cache/             # Caching
  commands/          # Command logic
  repl/              # REPL logic
  state/             # App state
```

## Error Handling

I should have handled everything but if you encounter any throws, I must have forgotten them. Maybe I find them at some point, maybe I don't. Not sure how much I'll use it now that it's completed.

## Requirements

- Node.js 18+  
- Internet connection (for PokéAPI requests)
