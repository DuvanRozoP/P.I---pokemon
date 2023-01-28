const {
  getPokemonByIdStore,
  getPokemonsByIdDbStore,
  getPokemonAllStore,
  getPokemonByParamsStore,
  createPokemonStore,
} = require('./Pokemons.store');
const { isEmpty, isNumber } = require('../../Helpers/helpers');

const getPokemonAll = async (name) => {
  try {
    //isEmpty(name);
    if (name) return await getPokemonByParamsStore(name);
    else return await getPokemonAllStore();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getPokemonById = async (id) => {
  try {
    isEmpty(id);
    const idPokemon = id.replace('S', '');
    isNumber(idPokemon);

    if (id.includes('S')) return await getPokemonsByIdDbStore(Number(idPokemon));
    else return await getPokemonByIdStore(Number(idPokemon));
  } catch (error) {
    throw new Error(error.message);
  }
};

const postPokemonDb = async (data) => {
  try {
    const { name, sprites, tagTypes, stats, height, weight } = data;
    isEmpty(name, sprites, tagTypes, stats, height, weight);
    isNumber(stats.healt, stats.attack, stats.defense, stats.speed, height, weight);

    const pokemon = await createPokemonStore(data);
    return `the pokemon ${pokemon.name} has been created successfully`;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getPokemonAll,
  getPokemonById,
  postPokemonDb,
};
