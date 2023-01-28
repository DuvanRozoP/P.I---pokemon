import './Create.css';

// * Hooks
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// & Component
import Loading from '../../Components/Loading/Loading';

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
    typesPoke: [],
  });

  useEffect(() => {
    if (typesPokemon?.length > 0) setIsLoading(false);
  }, [typesPokemon]);

  const handleChangeInput = (event) => {
    console.log(inputs);
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleTypes = (event) => {
    const newValue = event.target.value;
    if (!inputs.typesPoke.includes(newValue)) {
      setInputs((prevInputs) => {
        return {
          ...prevInputs,
          typesPoke: [...prevInputs.typesPoke, newValue],
        };
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={handleSubmit}>
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
        placeholder='Escribe la url de la imagen.'
        type='number'
      />

      <label>Ataque:</label>
      <input
        name='attack'
        value={inputs.attack}
        onChange={handleChangeInput}
        placeholder='Escribe la url de la imagen.'
        type='number'
      />

      <label>Defense:</label>
      <input
        name='defense'
        value={inputs.defense}
        onChange={handleChangeInput}
        placeholder='Escribe la url de la imagen.'
        type='number'
      />

      <label>Velocidad:</label>
      <input
        name='speed'
        value={inputs.speed}
        onChange={handleChangeInput}
        placeholder='Escribe la url de la imagen.'
        type='number'
      />

      <div className='containerTypes'>
        <div className='optines'>
          {typesPokemon.map(({ name, id }, index) => (
            <button onClick={handleTypes} value={name} key={index}>
              {name}
            </button>
          ))}
        </div>
        <div className='selecciones'>
          {inputs.typesPoke.map((element, index) => (
            <p key={index}>{element}</p>
          ))}
        </div>
      </div>

      <button type='submit'>Enviar</button>
    </form>
  );
};

export default Create;
