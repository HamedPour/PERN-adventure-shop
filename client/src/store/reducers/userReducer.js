const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      state = action.payload;
    // set the user
    default:
      return state;
  }
};

export default userReducer;
