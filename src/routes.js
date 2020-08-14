// Do not setup your controllers in this file. Setup each controller action
// in the controller folder under the correct file and only use their methods
// in this file.
const isAuthorised = require("./policies/isAuthorised");

const AuthController = require("./controller/AuthController");
const AuthControllerPolicy = require("./policies/AuthControllerPolicy");
const AdventuresController = require("./controller/AdventuresController");
const LandingController = require("./controller/LandingController");

module.exports = (app) => {
  app.get("/", LandingController.welcome);
  app.post("/signup", AuthControllerPolicy.signup, AuthController.signup);
  app.post("/signin", AuthController.signin);
  app.get("/adventures", AdventuresController.index);
};
