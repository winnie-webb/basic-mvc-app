const router = require("express").Router();
const registerUser = require("../models/RegisterUser");
const checkIfUserIsAuth = require("../models/IsUserAuth");
const authenticateUser = require("../models/Login");

router.get("/", checkIfUserIsAuth, (req, res) => {
  res.render("index", { greeting: "Hello there" });
});

router.get("/signin", (req, res) => {
  res.render("auth", { formType: "signin", formAction: "/signin" });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  authenticateUser(req, res, username, password);
});

router.get("/register", (req, res) => {
  res.render("auth", { formType: "signup", formAction: "/signin" });
});

router.post("/register", (req, res) => {
  const userData = req.body;
  registerUser(req, res, userData);
});
module.exports = router;
