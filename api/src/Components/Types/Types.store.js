const { Type } = require('../../db');

exports.getTypesAllStore = async () => {
  try {
    return await Type.findAll();
  } catch (error) {
    throw new Error(error);
  }
};
