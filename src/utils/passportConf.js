const pool = require("../models/db");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../config/config");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromBodyField("token"),
      secretOrKey: config.authentication.jwtSecret,
    },
    async (payload, done) => {
      try {
        // reach out to the DB and find user with this token
        const db_response = await pool.query(
          "SELECT * FROM adventurer WHERE id=$1",
          [payload.id]
        );
        const adventurer = db_response.rows[0];
        if (!adventurer) return done(null, false);
        done(null, "BOB");
      } catch (error) {
        done(error, false);
      }
    }
  )
);
