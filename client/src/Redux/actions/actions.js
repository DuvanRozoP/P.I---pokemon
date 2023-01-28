import {
  GET_POKEMONSALL,
  GET_ASD_POKEMON,
  GET_DES_POKEMON,
  GET_POKEMON,
  GET_DETAIL,
} from './types.js';
// , POST_POKEMONS, GET_DETAIL, GET_POKEMON
import store from '../store/index.js';

import axios from 'axios';
const request = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

export const getPokemons = () => {
  return async function (dispatch) {
    try {
      const pokemonsApi = await request.get('/pokemons');
      const pokemonsDb = pokemonsApi.data.succes.db.map(
        ({ id, stats, sprites, name, tagTypes }) => ({
          id: `S${id}`,
          name,
          attack: stats.attack,
          types: tagTypes,
          image: sprites,
        })
      );
      const pokemonsAll = [...pokemonsDb, ...pokemonsApi.data.succes.api];
      console.log('💻 -> pokemonsAll', pokemonsAll);
      return dispatch({
        type: GET_POKEMONSALL,
        payload: pokemonsAll,
      });
    } catch (error) {
      return dispatch({
        type: GET_POKEMONSALL,
        payload: [],
      });
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

export const alfPokemons = (isOn) => {
  const { pokemons } = store.getState();
  const array = [...pokemons];

  if (isOn) {
    const orderByAsc = array.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });

    return { type: GET_ASD_POKEMON, payload: orderByAsc };
  } else {
    const orderByDsc = array.sort((a, b) => {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    });

    return { type: GET_DES_POKEMON, payload: orderByDsc };
  }
};

export const attackPokemons = (isOn) => {
  const { pokemons } = store.getState();
  const array = [...pokemons];

  if (isOn) {
    const orderByAsc = array.sort((a, b) => b.attack - a.attack);
    return { type: GET_ASD_POKEMON, payload: orderByAsc };
  } else {
    const orderByDsc = array.sort((a, b) => a.attack - b.attack);
    return { type: GET_DES_POKEMON, payload: orderByDsc };
  }
};
