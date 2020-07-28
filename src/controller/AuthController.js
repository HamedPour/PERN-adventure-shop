const pool = require("../models/db");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const hashing = require("../models/hashing");

function jwtSignAdventurer(anAdventurer) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(anAdventurer, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  // signUP
  async signup(req, res) {
    try {
      // HASH PASSWORD FIRST!
      const hashedPassword = await hashing(req.body.password);
      console.log(typeof hashedPassword);
      const dbSingupResponse = await pool.query(
        "INSERT INTO adventurer (email, password) VALUES ($1, $2) RETURNING *",
        [req.body.email, hashedPassword]
      );
      const adventurer = dbSingupResponse.rows[0];
      const token = jwtSignAdventurer(adventurer);
      res.json({ adventurer, token });
    } catch (err) {
      console.error(err);
    }
  },
  // login
  // logout
};
