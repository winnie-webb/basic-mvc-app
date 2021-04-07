if (process.env.NODE_ENV !== "production") require("dotenv").config();

const UserModel = require("./Users");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;

function initialize(passport) {
  const authenticateUserLocal = async (username, password, done) => {
    try {
      // Check if user is registered
      const user = await UserModel.findOne({ username: username });

      if (user === null) {
        return done(null, false);
      }
      //

      // Check if passwords match
      const isPasswordAMatch = await bcrypt.compare(password, user.password);

      if (isPasswordAMatch) return done(null, user);
      else return done(null, false);
      //
    } catch (err) {
      done(err);
      console.log(err);
    }
  };

  const authenticateUserGoogle = async (
    request,
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    try {
      let user;

      user = await UserModel.findOne({ email: profile.email });

      // Save user to db if not found

      if (user) return done(null, user);

      const { email, displayName } = profile;
      user = new UserModel({
        email: email,
        username: displayName,
        provider: "google",
      });

      await user.save();

      //
      done(null, user);
    } catch (err) {
      done(err);
      console.log(err);
    }
  };

  passport.use(new LocalStrategy(authenticateUserLocal));

  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        passReqToCallback: true,
      },
      authenticateUserGoogle
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}
module.exports = initialize;
