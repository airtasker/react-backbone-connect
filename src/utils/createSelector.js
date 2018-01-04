export const createSelector = (...selectors) => {
  if (!selectors || selectors.length < 2) {
    throw new Error(
      "createSelector must have at least one selector and one resultFunc"
    );
  }
  const resultFunc = selectors.pop();
  return (store, ...args) => {
    const values = selectors.map(selector => selector(store, ...args));
    return resultFunc(...values, ...args);
  };
};

export const createStructuredSelector = (selectorObject) => {
  return (...args) => {
    const result = {};
    Object.keys(selectorObject).forEach(key => {
      result[key] = selectorObject[key](...args);
    });
    return result;
  };
};
