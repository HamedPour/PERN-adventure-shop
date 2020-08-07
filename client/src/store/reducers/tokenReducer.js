let savedToken = localStorage.getItem("token");
if (!savedToken) savedToken = null;

const tokenReducer = (state = savedToken, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return action.payload;
    case "REMOVE_TOKEN":
      return (state = null);
    default:
      return state;
  }
};

export default tokenReducer;
