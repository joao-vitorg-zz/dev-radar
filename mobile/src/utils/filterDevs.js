export default (devs, search) => {
  if (!search) {
    return devs;
  }

  const searchArray = search.split(',').map(tech => tech.trim().toLowerCase());

  return devs.filter(({ techs }) =>
    techs.some(tech => searchArray.includes(tech))
  );
};
