import './Search.css';
// &Actions
import { getPokemonByName, filterPokemon } from '../../Redux/actions/actions';

// ~Hooks
import { useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';

const Search = ({ arrayPokemons }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [isOn, setIsOn] = useState(true);
  const [events, setEvents] = useState('Api y Creados Por mi');
  const [filter, setFilter] = useState('ALF');

  const handlePokemonsALl = () => dispatch(filterPokemon());
  const findPokemon = () => dispatch(getPokemonByName(inputRef.current.value));

  const handleChange = () => setIsOn(!isOn);
  const handleSelectFilter = (event) => setFilter(String(event.target.value));
  const handleSelect = (event) => setEvents(String(event.target.value));

  useEffect(() => {
    dispatch(filterPokemon(isOn, events, filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOn, events, filter]);

  return (
    <div className='containerSearch'>
      <button onClick={handlePokemonsALl} id='all' className='showTextOff'>
        all
      </button>

      <p className={isOn ? 'showTextOn' : 'showTextOff'}>ASD</p>
      <label>
        <input id='check' type='checkbox' checked={isOn} onChange={handleChange} />
        <div className={isOn ? 'showCheck' : 'showCheckFalse'}></div>
      </label>
      <p className={!isOn ? 'showTextOn' : 'showTextOff'}>DSC</p>

      <div className='selectContainer'>
        <select onChange={handleSelectFilter}>
          <option>ALF</option>
          <option>Attack</option>
        </select>
      </div>

      <div className='selectContainer'>
        <select onChange={handleSelect}>
          <option>Api</option>
          <option>Creados Por mi</option>
          <option>Api y Creados Por mi</option>
        </select>
      </div>

      <div className='searchContainer'>
        <input ref={inputRef} type='text' placeholder='Ingrese el Pokemon.' />
        <button onClick={findPokemon}>Search</button>
      </div>
    </div>
  );
};

export default Search;
