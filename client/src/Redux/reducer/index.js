// !importar types acitons
import {
  GET_POKEMONSALL,
  FILTERS_POKEMONS,
  GET_POKEMON,
  GET_DETAIL,
  GET_TYPES,
  UPDATE_PAGE,
} from '../actions/types';

// *estado global
const initialState = {
  pokemons: [],
  filters: [],
  detail: {},
  types: [],
  page: 0,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POKEMONSALL:
      return {
        ...state,
        pokemons: payload,
      };
    case FILTERS_POKEMONS: // ! aqui
      return {
        ...state,
        filters: payload,
      };
    case GET_POKEMON:
      return {
        ...state,
        filters: payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: payload,
      };
    case UPDATE_PAGE:
      return {
        ...state,
        page: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
