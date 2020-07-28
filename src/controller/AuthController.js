// database pool import here
const config = require("../config/config");
const jwt = require("jsonwebtoken");

function jwtSignAdventurer(anAdventurer) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(anAdventurer, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  // signUP
  signup(req, res) {
    const adventurer = {
      email: req.body.email,
      password: req.body.password,
    };
    const token = jwtSignAdventurer(adventurer);
    res.json({ adventurer, token });
  },
  // login
  // logout
};
