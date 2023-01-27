const { Pokemon, Type } = require('../../db');
const axios = require('axios');

// ~--> POST.
exports.createPokemonStore = async ({
  name,
  nameType,
  life,
  attack,
  defense,
  speed,
  height,
  weight,
}) => {
  try {
    const [newPokemon, created] = await Pokemon.findOrCreate({
      where: { name },
      defaults: {
        name,
        life,
        attack,
        defense,
        speed,
        height,
        weight,
      },
    });
    if (created)
      nameType.forEach(async (element) => {
        const typeExist = await Type.findOrCreate({ where: { name: element } });
        newPokemon.addType(typeExist[0]);
      });
    else throw new Error(`The pokemon "${name}" already exists`);

    return newPokemon;
  } catch (error) {
    throw new Error(error.message);
  }
};
// &--> Get by id for api or database.
exports.getPokemonByIdStore = async (id) => {
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Number(id)}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.getPokemonsByIdDbStore = async (id) => {
  try {
    const find = await Pokemon.findByPk(id);
    if (find === null) throw new Error('No se encontro el Pokemon');
    else return find;
  } catch (error) {
    throw new Error(error.message);
  }
};
// *--> Get all.

let allPokemons = [];

exports.getPokemonAllStore = async () => {
  try {
    const getAllDatabase = await Pokemon.findAll();
    if (allPokemons.length >= 10)
      return {
        db: getAllDatabase,
        api: allPokemons,
      };

    const pokemons = await getAllPokemons('https://pokeapi.co/api/v2/pokemon');
    const pokemonsData = pokemons.map((pokemon) => getPokemonInfo(pokemon.name));

    return Promise.all(pokemonsData).then((responses) => {
      allPokemons = responses;
      return {
        db: getAllDatabase,
        api: responses,
      };
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

function getAllPokemons(url) {
  return axios
    .get(url)
    .then((response) => {
      const pokemons = response.data.results;
      allPokemons = [...allPokemons, ...pokemons];
      // * 480
      if (response.data.next && allPokemons.length <= 40) return getAllPokemons(response.data.next);
      return allPokemons;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

function getPokemonInfo(name) {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => {
      const { id, name, sprites, types, stats } = response.data;
      const pokeTypes = types.map((type) => type.type.name);
      return {
        id,
        name,
        attack: stats[1].base_stat,
        types: pokeTypes,
        image: sprites.other.home.front_default,
      };
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

// ^--> Get by name for database.
exports.getPokemonByParamsStore = async (name) => {
  try {
    const getByParams = await Pokemon.findOne({ where: { name } });
    if (getByParams !== null) return getByParams;

    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).catch((err) => {
      throw new Error(`Pokemon '${name}' not found.`);
    });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};