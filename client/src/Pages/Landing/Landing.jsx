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

  const pokemons = useSelector((state) => state.pokemons);
  const filters = useSelector((state) => state.filters);
  const page = useSelector((state) => state.page);

  useEffect(() => {
    console.log('hola estoy en landing');
    if (pokemons && filters?.length > 0) setIsLoading(false);
  }, [pokemons, filters]);

  if (isLoading) return <Loading />;

  return (
    <div className='containerLanding'>
      <Search arrayPokemons={pokemons} />
      <Pokemons arrayPokemons={filters} page={page} />
      <Pagination page={page} />
    </div>
  );
};

export default Landing;
