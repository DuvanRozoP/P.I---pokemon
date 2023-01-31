import './App.css';

// ~ Pages
import Presentation from './Pages/Presentation/Presentation';
import Landing from './Pages/Landing/Landing';
import Detail from './Pages/Detail/Detail';
import Create from './Pages/Create/Create';

// & Components
import Navar from './Components/Navar/Navar';

// *Hooks
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// ^Actions
import { getPokemons, getTypesPokemons, filterPokemon } from './Redux/actions/actions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemons(dispatch)).finally(() => {
      dispatch(filterPokemon());
      console.log('finalizo');
    });
    dispatch(getTypesPokemons(dispatch));
  }, [dispatch]);

  return (
    <>
      <Navar />
      <Routes>
        <Route path='/detail/:pokemonId' element={<Detail />} />
        <Route path='/create' element={<Create />} />
        <Route path='/home' element={<Landing />} />
        <Route exact path='/' element={<Presentation />} />
      </Routes>
    </>
  );
}

export default App;
