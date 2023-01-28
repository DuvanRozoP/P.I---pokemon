import './Detail.css';

import pokeball from '../../assets/pokebola.png';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

// & Components
import Loading from '../../Components/Loading/Loading';

// * Actions
import { getPokemonsDetail } from '../../Redux/actions/actions';
import { useState } from 'react';

const Detail = () => {
  const dispatch = useDispatch();
  const { pokemonId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({
    id: 0,
    name: '',
    weight: 0,
    height: 0,
    sprites: '',
    stats: {},
    tagTypes: [],
  });

  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    console.log('hola pokemonId');
    dispatch(getPokemonsDetail(pokemonId));
  }, [dispatch, pokemonId]);

  useEffect(() => {
    const { id, name, weight, height, sprites, stats, tagTypes } = detail;
    if (Object.values(detail)?.length > 0) {
      setState({
        id,
        name,
        weight,
        height,
        sprites,
        stats,
        tagTypes,
      });
      setIsLoading(false);
    }
    console.log('💻 -> Detail -> state', detail);
  }, [detail]);

  if (isLoading) return <Loading />;

  return (
    <section className='containerDetail'>
      <div className='cardDetail'>
        <div className='cardInfoBasic'>
          <img src={state.sprites} alt={state.name} />
          <h1>{state.name}</h1>
          <div className='typesCard'>
            <h4>Tipo: </h4>
            {state.tagTypes.map((type, index) => (
              <p key={index}>{type}</p>
            ))}
          </div>
        </div>
        <div className='cardInfoDetail'>
          <h1>Numero (ID): {state.id}</h1>
          <div className='stats'>
            <h2>Vida: {state.stats.healt}</h2>
            <h2>ataque: {state.stats.attack}</h2>
            <h2>defensa: {state.stats.defense}</h2>
            <h2>velocidad: {state.stats.speed}</h2>
          </div>
          <h3>Altura: {state.height}</h3>
          <h3>Peso: {state.weight}</h3>
        </div>
      </div>
      <div className='ambient'>
        <img id='poke1' src={pokeball} alt='pokebola' />
        <img id='poke2' src={pokeball} alt='pokebola' />
      </div>
    </section>
  );
};

export default Detail;

/**
 * 
[ ] Número de Pokemon (id)
[ ] Estadísticas (vida, ataque, defensa, velocidad)
[ ] Altura y peso
 * 
 */
