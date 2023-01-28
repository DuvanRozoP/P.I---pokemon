import './Pokemon.css';

import { Link } from 'react-router-dom';

const Pokemon = ({ detail, name, img, type }) => {
  return (
    <div className='cardPokemon'>
      <Link to={`/detail/${detail}`}>
        <img src={img} alt={name} />
      </Link>
      <h1>{name}</h1>
      <div className='containerTypes'>
        {type.map((element, index) => (
          <p key={index}>{element}</p>
        ))}
      </div>
    </div>
  );
};

export default Pokemon;
/**
 * {type.map((element) => (
          <p>{element}</p>
        ))}
 */
