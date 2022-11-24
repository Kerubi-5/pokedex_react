import { useEffect, useState } from "react";
import { IPokemon } from "./types";
import normalizePokemon from "./utils/normalize";

export type ReturnValue = {
  results: ReturnPokemonValue[];
  next?: string;
  prev?: string;
};

export type ReturnPokemonValue = {
  name: string;
  url: string;
};

const fetcher = async ({ offset }: { offset: number }) => {
  const limit = 8; // Limit items to be displayed

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${limit * offset}`
  );

  const data = await res.json();

  return normalizePokemon(data);
};

const usePokemon = ({ page }: { page?: number }) => {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [hasNext, setHasNext] = useState<string | undefined>(undefined);
  const [hasPrev, setHasPrev] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getPokemons = async () => {
      setLoading(true);

      const { next, pokemons, prev } = await fetcher({ offset: page ?? 0 });

      setPokemons((prev) => {
        return [...prev, ...pokemons];
      });

      setHasNext(next);
      setHasPrev(prev);
      setLoading(false);
    };

    // Set loading when fetching the pokemons
    getPokemons();
  }, [page]);

  return { pokemons, hasNext, hasPrev, loading };
};

export default usePokemon;
