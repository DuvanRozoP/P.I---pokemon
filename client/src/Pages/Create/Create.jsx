import './Create.css';

// * Hooks
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// & Component
import Loading from '../../Components/Loading/Loading';

import { request } from '../../Redux/actions/actions';

const Create = () => {
  const typesPokemon = useSelector((state) => state.types);
  const [isLoading, setIsLoading] = useState(true);
  const [inputs, setInputs] = useState({
    name: '',
    height: '',
    weight: '',
    sprites: '',
    healt: '',
    attack: '',
    defense: '',
    speed: '',
    tagTypes: [],
  });

  useEffect(() => {
    if (typesPokemon?.length > 0) setIsLoading(false);
  }, [typesPokemon]);

  const handleChangeInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, height, weight, sprites, healt, attack, defense, speed, tagTypes } = inputs;
    const newPokemon = {
      name,
      tagTypes,
      stats: {
        healt: Number(healt),
        attack: Number(attack),
        defense: Number(defense),
        speed: Number(speed),
      },
      sprites,
      height: Number(height),
      weight: Number(weight),
    };

    const createPokemon = await request.post('/pokemons', newPokemon);
    alert(createPokemon.data.succes);
  };

  const handleTypes = (event) => {
    const newValue = event.target.value;
    if (!inputs.tagTypes.includes(newValue)) {
      setInputs((prevInputs) => {
        return {
          ...prevInputs,
          tagTypes: [...prevInputs.tagTypes, newValue],
        };
      });
    }
    console.log('💻 -> Create -> inputs', inputs);
  };

  if (isLoading) return <Loading />;

  return (
    <section className='containerForm'>
      <form onSubmit={handleSubmit}>
        <div className='containerPart1'>
          <h1> Crea tu nuevo Pokemon </h1>

          <label>Nombre:</label>
          <input
            name='name'
            value={inputs.name}
            onChange={handleChangeInput}
            placeholder='Escribe el nombre.'
            type='text'
          />

          <label>Altura:</label>
          <input
            name='height'
            value={inputs.height}
            onChange={handleChangeInput}
            placeholder='Escribe el Altura.'
            type='number'
          />

          <label>Peso:</label>
          <input
            name='weight'
            value={inputs.weight}
            onChange={handleChangeInput}
            placeholder='Escribe el Peso.'
            type='number'
          />

          <label>Imagen:</label>
          <input
            name='sprites'
            value={inputs.sprites}
            onChange={handleChangeInput}
            placeholder='Escribe la url de la imagen.'
            type='text'
          />

          <label>Vida:</label>
          <input
            name='healt'
            value={inputs.healt}
            onChange={handleChangeInput}
            placeholder='Escribe la vide del pokemon.'
            type='number'
          />

          <label>Ataque:</label>
          <input
            name='attack'
            value={inputs.attack}
            onChange={handleChangeInput}
            placeholder='Escribe el ataque del pokemon.'
            type='number'
          />

          <label>Defense:</label>
          <input
            name='defense'
            value={inputs.defense}
            onChange={handleChangeInput}
            placeholder='Escribe la defensa del pokemon.'
            type='number'
          />

          <label>Velocidad:</label>
          <input
            name='speed'
            value={inputs.speed}
            onChange={handleChangeInput}
            placeholder='Escribe la velocidad del pokemon.'
            type='number'
          />
        </div>

        <div className='containerPart2'>
          <div className='containerTypes'>
            <select className='optines' onChange={handleTypes}>
              {typesPokemon.map(({ name, id }, index) => (
                <option onClick={handleTypes} value={name} key={index}>
                  {name}
                </option>
              ))}
            </select>
            <div className='selecciones'>
              {inputs.tagTypes.map((element, index) => (
                <p key={index}>{element}</p>
              ))}
            </div>
          </div>
          <button type='submit'>Enviar</button>
        </div>
      </form>
    </section>
  );
};

export default Create;
