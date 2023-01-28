const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  // sequelize.define('pokemon', {
  //   name: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  // });

  sequelize.define(
    'pokemon',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      sprites: {
        type: DataTypes.STRING,
      },
      tagTypes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: 'pokemonTypes'
      },
      stats: {
        type: DataTypes.JSON,
      },
      height: {
        type: DataTypes.FLOAT,
      },
      weight: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: false,
    }
  );
};
