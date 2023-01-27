const { Type } = require('../db');
const axios = require('axios');

// *Instancia para la creacion de datos para la tabla types
exports.addTypesDataBase = async () => {
  const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
  const typeArray = typesApi.data.results.map(({ name }) => ({ name }));
  await Type.bulkCreate(typeArray);
};
// *-------------------------------------------------------

// & reponse HTTP
exports.succes = (res, status, succes) => {
  res.status(status || 200).send({
    succes,
  });
};

exports.error = (res, status, error) => {
  res.status(status || 400).send({
    error,
  });
};
// &---------------

// ^validar datos
exports.isEmpty = (...args) => {
  for (const arg of args) if (!arg) throw new Error(`${arg} Invali Data.`);
};

exports.isNumber = (...args) => {
  for (const arg of args)
    if (isNaN(arg) || arg <= 0)
      throw new Error(`Invalid ${arg} must be number and greater than zero`);
};
// ^--------------
