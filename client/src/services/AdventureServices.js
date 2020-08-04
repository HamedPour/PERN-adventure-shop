import Api from "./Api";

export default {
  index() {
    return Api()
      .get("adventures")
      .catch((err) => {
        console.error("Axois ", err);
        throw new Error(err.response.data.errorType);
      });
  },
};
