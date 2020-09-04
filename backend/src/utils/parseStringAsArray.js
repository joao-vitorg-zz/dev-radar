module.exports = (str) => {
  return str.split(',').map((tech) => tech.trim().toLowerCase());
};
