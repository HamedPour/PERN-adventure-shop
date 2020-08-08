const initState = {
  totalQty: 0,
  totalPrice: 0,
  items: [],
};

function getExpirationTime() {
  const expires = 24 * 60 * 60; // for one day
  const now = Date.now();
  const schedule = Math.abs(now + expires * 1000);
  return schedule;
}

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // WAIT!! WAIT ONE DAMN MIN - how badly are we mutating things!??
      const oldCart = Object.assign(state, {});
      oldCart.totalQty++;
      oldCart.totalPrice += action.payload.price;
      oldCart.items.push(action.payload);

      // save cart & user in localStorage - add timestamp
      const cartToStorage = { ...oldCart, expires: getExpirationTime() };
      localStorage.setItem("cart", JSON.stringify(cartToStorage));
      return (state = oldCart);

    case "REMOVE_FROM_CART":
      return state;

    case "DELETE_CART":
      return (state = initState);

    case "SET_CART":
      return (state = action.payload);

    default:
      return state;
  }
};

export default cartReducer;
