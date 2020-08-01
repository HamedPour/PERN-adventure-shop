import Api from "./Api";

export default {
  signup(credentials) {
    return Api().post("signup", credentials);
  },

  signin(credentials) {
    return Api()
      .post("signin", credentials)
      .catch((err) => {
        const { errorType } = err.response.data;
        const { message } = err.response.data;
        throw { errorType, message };
      });
  },
};
