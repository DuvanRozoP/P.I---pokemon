// * CSS
import './Pokemons.css';

// &Components
import Pokemon from '../../Components/Pokemon/Pokemon';
import { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';

const Pokemons = ({ arrayPokemons }) => {
  const [state, setState] = useState({
    isLoading: true,
  });
  useEffect(() => {
    if (arrayPokemons?.length > 0) setState({ isLoading: false });
  }, [arrayPokemons, setState]);

  if (state.isLoading) return <Loading />;

  return (
    <div className='containerPokemons'>
      {arrayPokemons.map((pokemon, index) => {
        return (
          <Pokemon
            key={index}
            detail={pokemon.id}
            name={pokemon.name}
            img={pokemon.image}
            type={pokemon.types}
          />
        );
      })}
    </div>
  );
};

export default Pokemons;
