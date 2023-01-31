// * CSS
import './Pokemons.css';

// &Components
import Pokemon from '../../Components/Pokemon/Pokemon';

const Pokemons = ({ arrayPokemons, page }) => {
  if (!arrayPokemons.length) return <div className='containerPokemons'></div>;

  const pokemons = arrayPokemons.length === 1 ? [arrayPokemons[0]] : arrayPokemons[page];

  return (
    <div className='containerPokemons'>
      {pokemons.map((pokemon, index) => (
        <Pokemon
          key={pokemon.id || index}
          detail={pokemon.id}
          name={pokemon.name}
          img={pokemon.image}
          type={pokemon.types}
        />
      ))}
    </div>
  );
};

export default Pokemons;
