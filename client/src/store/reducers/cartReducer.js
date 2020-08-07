const initState = {
  totalQty: 0,
  totalPrice: 0,
  items: [],
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // WAIT!! WAIT ONE DAMN MIN - how badly are we mutating things!??
      const oldCart = Object.assign(state, {});
      oldCart.totalQty++;
      oldCart.totalPrice += action.payload.price;
      oldCart.items.push(action.payload);
      return (state = oldCart);
    default:
      return state;
  }
};

export default cartReducer;
