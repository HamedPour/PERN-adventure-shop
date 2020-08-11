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
      let flag = true;

      state.items.forEach((item) => {
        if (item.id === action.payload.adventure.id) {
          // No duplicate adventures allowed
          flag = false;
        }
      });

      if (flag) {
        const newCart = { ...state };
        newCart.totalQty++;
        newCart.totalPrice += action.payload.adventure.price;
        newCart.items.push(action.payload.adventure);
        newCart.adventurer = action.payload.adventurer;
        // save cart in localStorage - add timestamp
        newCart.expires = getExpirationTime();
        localStorage.setItem("cart", JSON.stringify(newCart));
        return (state = newCart);
      }
      return state;

    case "REMOVE_FROM_CART":
      const newCart = { ...state };
      newCart.totalQty--;
      newCart.totalPrice -= action.payload.price;
      newCart.items = newCart.items.filter((item) => {
        return item.id !== action.payload.id;
      });
      // save cart in localStorage - add timestamp
      newCart.expires = getExpirationTime();
      localStorage.setItem("cart", JSON.stringify(newCart));
      return (state = newCart);

    case "DELETE_CART":
      return (state = initState);

    case "SET_CART":
      return (state = action.payload);

    default:
      return state;
  }
};

export default cartReducer;
