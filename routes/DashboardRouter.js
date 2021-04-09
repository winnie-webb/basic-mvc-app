const { redirectToSigninIfNotAuth } = require("../models/IsUserAuth");
const router = require("express").Router();
router.get("/", redirectToSigninIfNotAuth, (req, res) =>
  res.render("dashboard.ejs")
);

module.exports = router;
