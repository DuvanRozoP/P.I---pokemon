import './App.css';

// ~ Pages
import Presentation from './Pages/Presentation/Presentation';
import Landing from './Pages/Landing/Landing';
import Detail from './Pages/Detail/Detail';

// & Components
import Navar from './Components/Navar/Navar';

// *Hooks
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// ^Actions
import { getPokemons } from './Redux/actions/actions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemons(dispatch));
  }, [dispatch]);

  return (
    <>
      <Navar />
      <Routes>
        <Route path='/detail/:pokemonId' element={<Detail />} />
        <Route path='/home' element={<Landing />} />
        <Route exact path='/' element={<Presentation />} />
      </Routes>
    </>
  );
}

export default App;
