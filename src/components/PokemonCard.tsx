import { IPokemon } from "../hooks/types";
import "../styles/card.css";

const PokemonCard = ({ name, sprite }: IPokemon) => {
  return (
    <article className="card">
      <img src={sprite} />
      <h3>{name}</h3>
    </article>
  );
};

export default PokemonCard;
