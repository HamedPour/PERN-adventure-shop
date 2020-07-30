import Api from "./Api";

export default {
  signup(credentials) {
    return Api().post("signup", credentials);
  },
};
