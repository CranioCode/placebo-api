import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import Doctor from "../models/doctor.js";
import User from "../models/user.js";

/**
 * @description Initializes passport for
 * authentication.
 */
function initializePassport() {
  passport.use(
    new LocalStrategy(
      {
        // Changing default username-password form field
        // values of passport
        usernameField: "email",
        passwordField: "password",
        session: true,
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        let user;

        const { type } = req.params;

        if (type === "doctor") {
          user = await Doctor.findOne({
            email,
          });
        } else {
          user = await User.findOne({
            email,
          });
        }

        // User Not Found
        if (!user) {
          return done("User not found", false);
        }

        // Wrong Password
        if (!(await bcrypt.compare(password, user.password))) {
          return done("Wrong Password", false);
        }

        // User Not Verified
        if (!user.verified) {
          return done("User not verified", false);
        }

        // Successful Login
        return done(null, {
          user,
          role: type === "doctor" ? "DOCTOR" : "USER",
        });
      }
    )
  );

  // Sets the cookie
  passport.serializeUser((data, done) => {
    const { user, role } = data;
    done(null, {
      email: user.email,
      role,
    });
  });

  // Reads the cookie and sets `req.user`
  passport.deserializeUser(async (data, done) => {
    try {
      let user;

      if (data.role === "USER") {
        user = await User.findOne({
          email: data.email,
        });
      } else {
        user = await Doctor.findOne({
          email: data.email,
        });
      }

      done(null, { user, role: data.role });
    } catch (err) {
      console.log(err);
      done("User Not Found", false);
    }
  });
}

export { initializePassport };
