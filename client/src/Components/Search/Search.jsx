import './Search.css';
// &Actions
import { alfPokemons, attackPokemons, getPokemonByName } from '../../Redux/actions/actions';

// ~Hooks
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const Search = ({ arrayPokemons, setRender }) => {
  const dispatch = useDispatch();
  const [isOn, setIsOn] = useState(true);
  const [events, setEvents] = useState('ALF');
  const [search, setSearch] = useState('');

  const handleChange = () => setIsOn(!isOn);
  const handleSelect = (event) => setEvents(String(event.target.value));
  const handleSearch = (event) => setSearch(event.target.value);
  const handlePokemonsALl = () => setRender(arrayPokemons);
  const findPokemon = () => dispatch(getPokemonByName(search));

  const handleEvents = () => {
    if (events === 'ALF') dispatch(alfPokemons(isOn));
    else if (events === 'Attack') dispatch(attackPokemons(isOn));
  };

  useEffect(() => {
    handleEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOn, events]);

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
        <select onChange={handleSelect}>
          <option>ALF</option>
          <option>Attack</option>
        </select>
      </div>

      <div className='searchContainer'>
        <input
          value={search}
          onChange={handleSearch}
          type='text'
          placeholder='Ingrese el Pokemon.'
        />
        <button onClick={findPokemon}>Search</button>
      </div>
    </div>
  );
};

export default Search;
