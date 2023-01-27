const express = require('express');

const router = express.Router();
const { succes, error } = require('../../Helpers/helpers');
const { getPokemonById, postPokemonDb, getPokemonAll } = require('./Pokemons.controller');

router.get('/', async (request, response) => {
  try {
    const { name } = request.query;
    succes(response, 200, await getPokemonAll(name));
  } catch (err) {
    error(response, 410, err.message);
  }
});

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    succes(response, 200, await getPokemonById(id));
  } catch (err) {
    error(response, 410, err.message);
  }
});

router.post('/', async (request, response) => {
  try {
    succes(response, 200, await postPokemonDb(request.body));
  } catch (err) {
    error(response, 412, err.message);
  }
});

// router.get('/types', (request, response) => {
//   response.send('POST /pokemons');
// });

module.exports = router;
