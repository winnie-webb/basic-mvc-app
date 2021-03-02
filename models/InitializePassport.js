const UserModel = require("./Users");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    try {
      const user = await UserModel.findOne({ username: username });
      if (user === null) {
        done(null);
        // return res
        //   .status(404)
        //   .json({ success: false, message: "User not found" });
      }

      const isPasswordAMatch = await bcrypt.compare(password, user.password);

      if (isPasswordAMatch) {
        done(null, user);
        // return res.status(201).json({ success: true, message: "User found" });
      } else {
        done(null, false);
      }

      // res.status(404).json({
      //   success: false,
      //   message: "Incorrect password. Please try again",
      // });
    } catch (err) {
      done(err);
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
