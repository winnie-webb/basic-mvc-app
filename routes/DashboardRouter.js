const router = require("express").Router();

router.get("/", (req, res) => res.render("dashboard.ejs"));

module.exports = router;
