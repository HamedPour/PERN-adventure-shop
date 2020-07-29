const pool = require("../models/db");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const hashPassword = require("../models/hashPassword");
const checkHashPassword = require("../models/checkHashPassword");

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
      const hashedPassword = await hashPassword(req.body.password);
      // put credentials into DB - wait for response
      const dbSingupResponse = await pool.query(
        "INSERT INTO adventurer (email, password) VALUES ($1, $2) RETURNING *",
        [req.body.email, hashedPassword]
      );
      const adventurer = dbSingupResponse.rows[0];
      const token = jwtSignAdventurer(adventurer);
      return res.json({ adventurer, token });
    } catch (err) {
      console.error(err.message);
    }
  },
  // login
  async signin(req, res) {
    try {
      const dbSinginResponse = await pool.query(
        "SELECT * FROM adventurer WHERE email=$1",
        [req.body.email]
      );
      if (dbSinginResponse.rows.length === 0) {
        // email was not found in DB
        return res.status(403).json({ error: "No such adventurer" });
      }

      // user object
      const adventurer = dbSinginResponse.rows[0];

      // got the user from the BD - lets now check passwords
      storedPassword = adventurer.password;

      // check if user password and stored hash password match
      const passwordsMatch = await checkHashPassword(
        adventurer.email,
        req.body.password,
        storedPassword
      );

      if (!passwordsMatch) {
        return res.json({ error: "Password do not match" });
      }

      res.json(adventurer);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        error: err.message,
      });
    }
  },
  // logout
};
