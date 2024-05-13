const getItem = (key) => {
  return localStorage.getItem(key);
};

const removeItem = (key) => {
  localStorage.removeItem(key);
};

const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const keys = {
  TOKEN: 'TOKEN',
  TOKEN_EXPIRATION: 'TOKEN_EXP',
  PAGINATION_FILTER_OBJECT: 'PAGINATION_FILTER_OBJECT',
  CURRENT_FILE_OBJECT: 'CURRENT_FILE_OBJECT'
};

const forExport = {
  getItem,
  removeItem,
  setItem,
};

export default forExport;
