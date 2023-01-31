import {
  GET_POKEMONSALL,
  FILTERS_POKEMONS,
  GET_POKEMON,
  GET_DETAIL,
  GET_TYPES,
  UPDATE_PAGE,
} from './types.js';

import store from '../store/index.js';

import axios from 'axios';
export const request = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

export const getPokemons = () => async (dispatch) => {
  try {
    const pokemonsApi = await request.get('/pokemons');
    dispatch({
      type: GET_POKEMONSALL,
      payload: pokemonsApi.data.succes,
    });
  } catch (error) {
    alert(error.response.data.error);
  }
};
export const getTypesPokemons = () => async (dispatch) => {
  try {
    const types = await request.get('/types');
    return dispatch({
      type: GET_TYPES,
      payload: types.data.succes,
    });
  } catch (error) {
    alert(error.response.data.error);
  }
};
export const getPokemonsDetail = (id) => async (dispatch) => {
  try {
    const pokemons = await request.get(`/pokemons/${id}`);
    return dispatch({
      type: GET_DETAIL,
      payload: pokemons.data.succes,
    });
  } catch (error) {
    alert(error.response.data.error);
  }
};
export const getPokemonByName = (name) => async (dispatch) => {
  try {
    const pokemon = await request.get(`/pokemons?name=${name}`);
    console.log('💻 -> getPokemonByName -> pokemon', pokemon);
    return dispatch({
      type: GET_POKEMON,
      payload: [pokemon.data.succes],
    });
  } catch (error) {
    alert(error.response.data.error);
  }
};

export const filterPokemon =
  (isOn = true, events = 'Api', filter = 'ALF') =>
  (dispatch) => {
    const { pokemons } = store.getState();
    const { api, db } = pokemons;
    let array;
    let orderArray;
    let configSort;

    switch (events) {
      case 'Api':
        array = [...api];
        break;
      case 'Creados Por mi':
        array = db.length > 0 ? [...db] : [];
        break;
      case 'Api y Creados Por mi':
        array = [...db, ...api];
        break;
      default:
        alert('evento desconocido');
        break;
    }

    if (filter === 'ALF')
      configSort = (a, b) => (isOn ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    else configSort = (a, b) => (isOn ? b.attack - a.attack : a.attack - b.attack);

    orderArray = array.sort(configSort);

    function paginateArray(array, pageSize) {
      let result = [];
      for (let i = 0; i < array.length; i += pageSize) result.push(array.slice(i, i + pageSize));
      return result;
    }

    return dispatch({
      type: FILTERS_POKEMONS,
      payload: paginateArray(orderArray, 12),
    });
  };

export const updatePage = (page) => ({ type: UPDATE_PAGE, payload: page });
/*

const str1 = 'a';
const str2 = 'b';

console.log(str1.localeCompare(str2)); // -1 (str1 es menor que str2)
console.log(str2.localeCompare(str1)); // 1 (str2 es mayor que str1)
console.log(str1.localeCompare(str1)); // 0 (str1 es igual a str1)

*/
