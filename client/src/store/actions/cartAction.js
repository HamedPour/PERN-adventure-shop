export const addToCart = (anAdventure, anAdventurer) => {
  return {
    type: "ADD_TO_CART",
    payload: { adventure: anAdventure, adventurer: anAdventurer },
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

export const removeFromCart = (anItem) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: anItem,
  };
};
