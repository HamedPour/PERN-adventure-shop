export const addToCart = (anAdventure) => {
  return {
    type: "ADD_TO_CART",
    payload: anAdventure,
  };
};

export const deleteCart = () => {
  return {
    type: "DELETE_CART",
  };
};

export const setCart = (aCart) => {
  return {
    type: "SET_CART",
    payload: aCart,
  };
};
