import './Landing.css';

// & Components
import Search from '../../Components/Search/Search';
import Pokemons from '../../Components/Pokemons/Pokemons';
import Loading from '../../Components/Loading/Loading';
import Pagination from '../../Components/Pagination/Pagination';

// ~Hooks
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [render, setRender] = useState([]);

  const pokemons = useSelector((state) => state.pokemons);
  const pokemon = useSelector((state) => state.pokemon);
  const updateRender = (newRender) => setRender(newRender);

  useEffect(() => {
    console.log('hola');
    if (Object.values(pokemon).length > 0) {
      updateRender([pokemon]);
      setIsLoading(false);
    } else if (pokemons?.api?.length > 0) {
      setIsLoading(false);
    }
  }, [pokemons, pokemon, render]);

  if (isLoading) return <Loading />;

  return (
    <div className='containerLanding'>
      <Search arrayPokemons={pokemons} setRender={updateRender} />
      <Pokemons arrayPokemons={render} />
      {!Object.values(pokemon).length > 0 ? <Pagination setRender={updateRender} /> : ''}
    </div>
  );
};

export default Landing;

/*

if (filters?.length > 0 && JSON.stringify(filters) !== prevFilters) {
      setPrevFilters(JSON.stringify(filters));
      setState({ ...state, isLoading: false, render: filters.slice(0, 12) });
    } else if (pokemons.api?.length > 0 || pokemons.db?.length > 0) {
      setState({ ...state, isLoading: false, render: pokemons.api.slice(0, 12) });
    }

*/
