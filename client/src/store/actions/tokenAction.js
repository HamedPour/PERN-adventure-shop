export const setToken = (aToken) => {
  return {
    type: "SET_TOKEN",
    payload: aToken,
  };
};

export const removeToken = () => {
  return {
    type: "REMOVE_TOKEN",
  };
};
