const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      state = action.payload;
      return state;
    // set the user
    default:
      return state;
  }
};

export default userReducer;
