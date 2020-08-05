import Api from "./Api";

export default {
  index(aToken) {
    return Api().get("adventures", {
      headers: {
        token: aToken,
      },
    });
  },
};
