const router = require("express").Router();
const passport = require("passport");
const registerUser = require("../models/RegisterUser");
const checkIfUserIsAuth = require("../models/IsUserAuth");
const InitializePassport = require("../models/InitializePassport");

InitializePassport(passport);
router.use(passport.initialize());
router.use(passport.session());

router.get("/", checkIfUserIsAuth, (req, res) => {
  res.render("index", { greeting: "Hello there" });
});

router.get("/signin", (req, res) => {
  res.render("auth", { formType: "signin", formAction: "/signin" });
});

router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
  })
);

router.get("/register", (req, res) => {
  res.render("auth", { formType: "signup", formAction: "/signin" });
});

router.post("/register", (req, res) => {
  const userData = req.body;
  registerUser(req, res, userData);
});
module.exports = router;
