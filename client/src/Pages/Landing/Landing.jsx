import './Landing.css';
// import wallpaper from '../../assets/14734-pokemon.png';

// & Components
import Search from '../../Components/Search/Search';
import Pokemons from '../../Components/Pokemons/Pokemons';
import Loading from '../../Components/Loading/Loading';

// ~Hooks
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Landing = () => {
  const [state, setState] = useState({ isLoading: true, render: [] });

  const pokemons = useSelector((state) => state.pokemons);
  const filters = useSelector((state) => state.filters);

  const handlerSlice = (array, start = 0, end = 12) => array.slice(start, end);

  useEffect(() => {
    if (filters?.length > 0)
      setState({ ...state, isLoading: false, render: handlerSlice(filters) });
    else if (pokemons.api?.length > 0 || pokemons.db?.length > 0)
      setState({ isLoading: false, render: handlerSlice(pokemons.api) });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons, filters]);

  if (state.isLoading) return <Loading />;

  return (
    <div className='containerLanding'>
      <Search />
      <Pokemons arrayPokemons={state.render} />
      <div>Pagination</div>
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
