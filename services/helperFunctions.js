exports.isProductExist = (array, itemToCheck, key) => {
  const isExist = array.some((item) => item[key] === itemToCheck[key]);

  return isExist;
};
