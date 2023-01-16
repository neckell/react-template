const camelToSnakeKey = (key) => {
  return key.split('_').reduce((substr, current) => {
    return substr + current.charAt(0).toUpperCase() + current.slice(1);
  });
};

export const camelToSnake = (obj) => {
  const newObj = {};
  for (const property in obj) {
    const key = camelToSnakeKey(property);
    newObj[key] = obj[property];
  }
  return newObj;
};