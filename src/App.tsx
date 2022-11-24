import usePokemon from "./hooks/usePokemon";
import PokemonCard from "./components/PokemonCard";
import Loader from "./components/Loader";
import Fuse from "fuse.js";
import "./styles/app.css";
import { useEffect, useState } from "react";

function App() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const { pokemons, hasNext, loading } = usePokemon({ page });

  const loadMore = (e: Event) => {
    // Check if scroll is at the bottom of the page
    if (
      window?.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const options = {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: ["name"],
    shouldSort: true,
  };

  const fuse = new Fuse(pokemons, options);

  useEffect(() => {
    window.addEventListener("scroll", loadMore);

    return () => {
      window.removeEventListener("scroll", loadMore);
    };
  }, []);

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <input
        type="text"
        placeholder="Search pokemon's name..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="searchbar"
      />
      <div className="container column">
        {!!search ? (
          <>
            {fuse
              .search(search)
              .map((item) => item.item)
              .map((pokemon, index) => {
                return (
                  <PokemonCard
                    key={pokemon.name + index}
                    name={pokemon.name}
                    sprite={pokemon.sprite}
                    url={pokemon.url}
                  />
                );
              })}
          </>
        ) : (
          <>
            {pokemons?.map((pokemon, index) => {
              return (
                <PokemonCard
                  key={pokemon.name + index}
                  name={pokemon.name}
                  sprite={pokemon.sprite}
                  url={pokemon.url}
                />
              );
            })}
          </>
        )}
      </div>

      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        ""
      )}
      {!!hasNext ? "" : <h2>Oops... looks like there's no more pokemon</h2>}
    </div>
  );
}

export default App;
