const token = localStorage.getItem("token");
let isTokenPresent = true;
if (!token) isTokenPresent = false;

const isLoggedReducer = (state = isTokenPresent, action) => {
  switch (action.type) {
    case "SIGN_OUT":
      return (state = false);
    case "SIGN_IN":
      return (state = true);
    default:
      return state;
  }
};

export default isLoggedReducer;
