const router = require("express").Router();
const passport = require("passport");
const registerUser = require("../models/RegisterUser");
const InitializePassport = require("../models/InitializePassport");
const {
  redirectToDashboardIfAlreadyAuth,
  redirectToSigninIfNotAuth,
} = require("../models/IsUserAuth");

InitializePassport(passport);

router.get("/signin", redirectToDashboardIfAlreadyAuth, (req, res) => {
  res.render("auth", { formType: "signin", formAction: "/signin" });
});

router.post("/signin", redirectToDashboardIfAlreadyAuth, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(502).json({ success: false, message: err.message });
    }
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect username or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(502).json({ success: false, message: err.message });
      }
      return res.status(200).json({ success: true });
    });
  })(req, res, next);
});

router.get("/register", redirectToDashboardIfAlreadyAuth, (req, res) => {
  res.render("auth", { formType: "signup", formAction: "/signin" });
});

router.post("/register", (req, res) => {
  const userData = req.body;
  registerUser(req, res, userData);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/register",
  })
);

router.delete("/signout", (req, res) => {
  req.logOut();
  res.redirect("/auth/signin");
});

module.exports = router;
