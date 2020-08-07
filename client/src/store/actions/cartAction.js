export const addToCart = (anAdventure) => {
  return {
    type: "ADD_TO_CART",
    payload: anAdventure,
  };
};
