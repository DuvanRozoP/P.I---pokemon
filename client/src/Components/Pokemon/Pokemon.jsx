import './Pokemon.css';

const Pokemon = ({ name, img, type }) => {
  return (
    <div className='cardPokemon'>
      <img src={img} alt={name} />
      <h1>{name}</h1>
      <div className='containerTypes'>
        {type.map((element) => (
          <p>{element}</p>
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
