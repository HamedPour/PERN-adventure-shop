// Do not setup your controllers in this file. Setup each controller action
// in the controller folder under the correct file and only use their methods
// in this file.

const AuthController = require("./controller/AuthController");
const AuthControllerPolicy = require("./policies/AuthControllerPolicy");

module.exports = (app) => {
  app.post("/signup", AuthControllerPolicy.signup, AuthController.signup);
  app.post("/signin", AuthController.signin);
};
