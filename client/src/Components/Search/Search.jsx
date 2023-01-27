import './Search.css';
// &Actions
import { alfPokemons, attackPokemons } from '../../Redux/actions/actions';

// ~Hooks
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const Search = () => {
  const dispatch = useDispatch();
  const [isOn, setIsOn] = useState(false);
  const [events, setEvents] = useState('ALF');
  function handleChange() {
    setIsOn((prevIsOn) => !prevIsOn);
  }

  const handlerButton = (event) => {
    setEvents(String(event.target.value));
  };

  useEffect(() => {
    switch (events) {
      case 'ALF':
        dispatch(alfPokemons(isOn));
        break;
      case 'Attack':
        dispatch(attackPokemons(isOn));
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOn]);

  return (
    <div className='containerSearch'>
      <p className={isOn ? 'showTextOn' : 'showTextOff'}>ASD</p>
      <label>
        <input id='check' type='checkbox' checked={isOn} onChange={handleChange} />
        <div className={isOn ? 'showCheck' : 'showCheckFalse'}></div>
      </label>
      <p className={!isOn ? 'showTextOn' : 'showTextOff'}>DSC</p>

      <button onClick={handlerButton} value='ALF'>
        ALF
      </button>
      <button onClick={handlerButton} value='Attack'>
        Attack
      </button>
      <input type='text' placeholder='Ingrese el Pokemon.' />
      <button>Search</button>
    </div>
  );
};

export default Search;
