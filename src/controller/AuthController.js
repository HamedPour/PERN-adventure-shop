const pool = require("../models/db");
const jwtUtils = require("../utils/jtwUtils");
const bcryptHashing = require("../utils/bcryptHashing");

module.exports = {
  // signUP
  async signup(req, res) {
    try {
      // HASH PASSWORD FIRST!
      const hashedPassword = await bcryptHashing.hashPassword(
        req.body.password
      );

      // put credentials into DB - wait for response
      const DB_signup_response = await pool.query(
        "INSERT INTO adventurer (email, password) VALUES ($1, $2) RETURNING *",
        [req.body.email, hashedPassword]
      );

      const adventurer = DB_signup_response.rows[0];
      const token = jwtUtils.jwtSignAdventurer(adventurer);
      return res.json({ adventurer, token });
    } catch (err) {
      if (
        err.message ===
        'duplicate key value violates unique constraint "adventurer_email_key"'
      ) {
        return res.json({
          error: "User Already Exists!",
          errorType: "duplicateUser",
        });
      }
      return res.json({ error: "Something went tots wrong!!" });
    }
  },
  // login ===================================================================
  // =========================================================================
  async signin(req, res) {
    try {
      const DB_signin_response = await pool.query(
        "SELECT * FROM adventurer WHERE email=$1",
        [req.body.email]
      );

      if (DB_signin_response.rows.length === 0) {
        // email was not found in DB
        return res
          .status(403)
          .json({ errorType: "invalidUser", message: "User does not exist" });
      }

      // user object
      let adventurer = DB_signin_response.rows[0];

      // got the user from the BD - lets now check passwords
      storedPassword = adventurer.password;

      // check if user password and stored hash password match
      const passwordsMatch = await bcryptHashing.checkHashPassword(
        adventurer.email,
        req.body.password,
        storedPassword
      );

      if (!passwordsMatch) {
        return res.status(403).json({
          errorType: "invalidPassword",
          message: "Password do not match",
        });
      }

      // After password is validated - setup JWT Token for user
      const token = jwtUtils.jwtSignAdventurer(adventurer);

      // Tell me if there is a good reason to send the hash password back
      // to the client as a confirmation. ??? we're already sending the token
      const { id, email } = adventurer;
      adventurer = { id, email };
      res.json({
        adventurer,
        token,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        error: err.message,
      });
    }
  },
  // logout
};
