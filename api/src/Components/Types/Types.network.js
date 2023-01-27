const express = require('express');
const router = express.Router();
const { succes, error } = require('../../Helpers/helpers');
const { getTypesAllStore } = require('./Types.store');

router.get('/', async (request, response) => {
  try {
    succes(response, 200, await getTypesAllStore());
  } catch (err) {
    error(response, 401, err.message);
  }
});

module.exports = router;
