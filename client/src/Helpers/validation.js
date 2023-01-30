const validateInput = (inputs) => {
  //const imgs = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png|svg)/;
  const onlyCaract = /^[a-zA-Z]*$/;
  const imgsv2 = /^https:\/\//;

  let erros = {};

  const objetoNumbers = {
    height: inputs.height,
    weight: inputs.weight,
    healt: inputs.healt,
    attack: inputs.attack,
    defense: inputs.defense,
    speed: inputs.speed,
  };

  const isEmpty = (arg) => {
    for (const iterator in arg)
      if (arg[iterator].length === 0) erros = { ...erros, [`${iterator}`]: 'Campo obligatorio' };
  };

  const isNumber = (arg) => {
    for (const iterator in arg)
      if (isNaN(arg[iterator])) erros = { ...erros, [`${iterator}`]: 'debe ser numero' };
  };

  isEmpty(inputs);
  isNumber(objetoNumbers);

  if (!onlyCaract.test(inputs.name)) erros = { ...erros, name: 'debe contener solo letras' };
  if (!imgsv2.test(inputs.sprites)) erros = { ...erros, sprites: 'debe ser una Url' };

  return erros;
};

export default validateInput;
