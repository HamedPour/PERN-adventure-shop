// Do not setup your controllers in this file. Setup each controller action
// in the controller folder under the correct file and only use their methods
// in this file.

const AuthController = require("./controller/AuthController");

module.exports = (app) => {
  app.post("/signup", AuthController.signup);
};
