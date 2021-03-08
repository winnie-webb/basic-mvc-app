const UserModel = require("./Users");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const fetch = require("node-fetch");

function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    try {
      const user = await UserModel.findOne({ username: username });

      if (user === null) {
        return done(null, false);
      }

      const isPasswordAMatch = await bcrypt.compare(password, user.password);

      if (isPasswordAMatch) return done(null, user);
      else return done(null, false);
    } catch (err) {
      done(err);
      console.log(err);
    }
  };

  passport.use(new LocalStrategy(authenticateUser));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
      done(err, user);
    });
  });
}
module.exports = initialize;
