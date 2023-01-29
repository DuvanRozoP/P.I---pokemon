// * CSS
import './Pokemons.css';

// &Components
import Pokemon from '../../Components/Pokemon/Pokemon';
import { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';

const Pokemons = ({ arrayPokemons }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (arrayPokemons?.length > 0) setIsLoading(false);
  }, [arrayPokemons]);

  if (isLoading) return <Loading />;

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
