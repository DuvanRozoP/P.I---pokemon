// !importar types acitons
import {
  GET_POKEMONSALL,
  GET_ASD_POKEMON,
  GET_DES_POKEMON,
  GET_POKEMON,
  GET_DETAIL,
} from '../actions/types';

// *estado global
const initialState = {
  pokemons: [],
  filters: [],
  pokemon: {},
  detail: {},
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POKEMONSALL:
      return {
        ...state,
        pokemons: payload,
      };
    case GET_ASD_POKEMON:
      return {
        ...state,
        filters: payload,
      };
    case GET_DES_POKEMON:
      return {
        ...state,
        filters: payload,
      };
    case GET_POKEMON:
      return {
        ...state,
        pokemon: payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
