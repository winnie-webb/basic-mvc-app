const router = require("express").Router();
const registerUser = require("../models/RegisterUser");
router.get("/", (req, res) => {
  res.render("index", { greeting: "Hello there" });
});

router.get("/signin", (req, res) => {
  res.render("auth", { formType: "signin", formAction: "/" });
});

router.get("/register", (req, res) => {
  res.render("auth", { formType: "signup", formAction: "/signin" });
});

router.post("/register", (req, res) => {
  const userData = req.body;
  registerUser(req, res, userData);
});
module.exports = router;
