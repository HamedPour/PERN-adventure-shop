const passport = require("passport");
require("../utils/passportConf");

module.exports = function (req, res, next) {
  passport.authenticate("jwt", function (err, user) {
    if (err || !user) {
      res.status(403).send({
        error: "You are not authorised to access this resource. Please login",
      });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};
