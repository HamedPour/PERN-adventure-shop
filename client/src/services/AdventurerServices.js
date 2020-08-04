import Api from "./Api";

export default {
  signup(credentials) {
    return Api()
      .post("signup", credentials)
      .catch((err) => {
        throw new Error(err.response.data.errorType);
      });
  },

  signin(credentials) {
    return Api()
      .post("signin", credentials)
      .catch((err) => {
        throw new Error(err.response.data.errorType);
      });
  },
};
