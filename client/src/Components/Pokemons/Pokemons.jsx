// * CSS
import './Pokemons.css';

// &Components
import Pokemon from '../../Components/Pokemon/Pokemon';

const Pokemons = ({ arrayPokemons }) => {
  return (
    <div className='containerPokemons'>
      {arrayPokemons.map((pokemon, index) => (
        <Pokemon
          key={index}
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
