// const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// importando compoenentes
const pokemons = require('../Components/Pokemons/Pokemons.network');
const types = require('../Components/Types/Types.network');
//const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const router = (server) => {
  server.use('/pokemons', pokemons);
  server.use('/types', types);
};

module.exports = router;
