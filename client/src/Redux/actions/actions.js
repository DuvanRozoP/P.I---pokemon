import {
  GET_POKEMONSALL,
  FILTERS_POKEMONS,
  GET_POKEMON,
  GET_DETAIL,
  GET_TYPES,
} from './types.js';
import store from '../store/index.js';

import axios from 'axios';
export const request = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

export const getPokemons = () => {
  return async function (dispatch) {
    try {
      const pokemonsApi = await request.get('/pokemons');
      return dispatch({
        type: GET_POKEMONSALL,
        payload: pokemonsApi.data.succes,
      });
    } catch (error) {
      return dispatch({
        type: GET_POKEMONSALL,
        payload: [],
      });
    }
  };
};

export const getTypesPokemons = () => {
  return async function (dispatch) {
    try {
      const types = await request.get('/types');
      return dispatch({
        type: GET_TYPES,
        payload: types.data.succes,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getPokemonsDetail = (id) => {
  return async function (dispatch) {
    try {
      const pokemons = await request.get(`/pokemons/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: pokemons.data.succes,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getPokemonByName = (name) => {
  return async function (dispatch) {
    try {
      const pokemon = await request.get(`/pokemons?name=${name}`);
      return dispatch({
        type: GET_POKEMON,
        payload: pokemon.data.succes,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const filterPokemon = (isOn, events, filter) => {
  return function (dispatch) {
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
        array = [...db];
        break;
      case 'Api y Creados Por mi':
        array = [...db, ...api];
        break;
      default:
        console.log('nose que mierda llego', events);
        break;
    }

    if (filter === 'ALF') {
      configSort = (a, b) => (isOn ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    } else {
      configSort = (a, b) => (isOn ? b.attack - a.attack : a.attack - b.attack);
    }

    orderArray = array.sort(configSort);

    return dispatch({
      type: FILTERS_POKEMONS,
      payload: orderArray,
    });
  };
};

/*
const str1 = 'a';
const str2 = 'b';

console.log(str1.localeCompare(str2)); // -1 (str1 es menor que str2)
console.log(str2.localeCompare(str1)); // 1 (str2 es mayor que str1)
console.log(str1.localeCompare(str1)); // 0 (str1 es igual a str1)

*/
