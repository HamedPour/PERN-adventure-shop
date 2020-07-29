const config = require("../config/config");
const jwt = require("jsonwebtoken");

module.exports = {
  jwtSignAdventurer(anAdventurer) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(anAdventurer, config.authentication.jwtSecret, {
      expiresIn: ONE_WEEK,
    });
  },
};
