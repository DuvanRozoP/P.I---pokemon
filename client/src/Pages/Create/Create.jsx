import './Create.css';

// * Hooks
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// & Component
import Loading from '../../Components/Loading/Loading';
import validateInput from '../../Helpers/validation';

// ~ actions
import { request, getPokemons } from '../../Redux/actions/actions';

const Create = () => {
  const dispatch = useDispatch();
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

  const [erros, setErros] = useState({
    name: '',
    height: '',
    weight: '',
    sprites: '',
    healt: '',
    attack: '',
    defense: '',
    speed: '',
  });

  useEffect(() => {
    if (typesPokemon?.length > 0) setIsLoading(false);
  }, [typesPokemon]);

  const handleChangeInput = (event) =>
    setInputs({ ...inputs, [event.target.name]: event.target.value });

  const handleChangeErros = () => setErros(validateInput(inputs));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.values(erros).length > 1) alert('no debes de tener errores en los campos');
    else if (inputs.tagTypes.length === 0) alert('debes de tener minimo un tipo para el pokemon');
    else {
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

      setInputs({
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

      dispatch(getPokemons(dispatch));
      alert(createPokemon.data.succes);
    }
  };

  const handleTypes = (event) => {
    const newValue = event.target.value;
    if (!inputs.tagTypes.includes(newValue) && inputs.tagTypes.length < 3) {
      setInputs((prevInputs) => {
        return {
          ...prevInputs,
          tagTypes: [...prevInputs.tagTypes, newValue],
        };
      });
    } else {
      alert('solo puedes agregar 3 tipos diferentes.');
    }
  };

  if (isLoading) return <Loading />;

  return (
    <section className='containerForm'>
      <form onSubmit={handleSubmit}>
        <div className='containerPart1'>
          <h1> Crea tu nuevo Pokemon </h1>

          <label>Nombre: {erros?.name?.length > 0 ? erros.name : ''}</label>
          <input
            name='name'
            value={inputs.name}
            onBlur={handleChangeErros}
            onChange={handleChangeInput}
            placeholder='Escribe el nombre.'
            type='text'
          />

          <label>Altura: {erros?.height?.length > 0 ? erros.height : ''}</label>
          <input
            name='height'
            value={inputs.height}
            onBlur={handleChangeErros}
            onChange={handleChangeInput}
            placeholder='Escribe el Altura.'
            type='number'
          />

          <label>Peso: {erros?.weight?.length > 0 ? erros.weight : ''}</label>
          <input
            name='weight'
            value={inputs.weight}
            onBlur={handleChangeErros}
            onChange={handleChangeInput}
            placeholder='Escribe el Peso.'
            type='number'
          />

          <label>Imagen: {erros?.sprites?.length > 0 ? erros.sprites : ''}</label>
          <input
            name='sprites'
            value={inputs.sprites}
            onBlur={handleChangeErros}
            onChange={handleChangeInput}
            placeholder='Escribe la url de la imagen.'
            type='text'
          />

          <label>Vida: {erros?.healt?.length > 0 ? erros.healt : ''}</label>
          <input
            name='healt'
            value={inputs.healt}
            onBlur={handleChangeErros}
            onChange={handleChangeInput}
            placeholder='Escribe la vide del pokemon.'
            type='number'
          />

          <label>Ataque: {erros?.attack?.length > 0 ? erros.attack : ''}</label>
          <input
            name='attack'
            value={inputs.attack}
            onBlur={handleChangeErros}
            onChange={handleChangeInput}
            placeholder='Escribe el ataque del pokemon.'
            type='number'
          />

          <label>Defense: {erros?.defense?.length > 0 ? erros.defense : ''}</label>
          <input
            name='defense'
            value={inputs.defense}
            onBlur={handleChangeErros}
            onChange={handleChangeInput}
            placeholder='Escribe la defensa del pokemon.'
            type='number'
          />

          <label>Velocidad: {erros?.speed?.length > 0 ? erros.speed : ''}</label>
          <input
            name='speed'
            value={inputs.speed}
            onBlur={handleChangeErros}
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
