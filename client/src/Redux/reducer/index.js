// !importar types acitons
import { GET_POKEMONSALL, GET_ASD_POKEMON, GET_DES_POKEMON } from '../actions/types';

// *estado global
const initialState = {
  pokemons: [],
  filters: [],
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
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
