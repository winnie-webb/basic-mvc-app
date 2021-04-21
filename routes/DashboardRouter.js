const { redirectToSigninIfNotAuth } = require("../models/IsUserAuth");
const UserModel = require("../models/Users");
const ExerciseModel = require("../models/Excercises");
const router = require("express").Router();

router.get("/", redirectToSigninIfNotAuth, async (req, res) => {
  const user = await UserModel.findOne({ _id: req.user });

  res.redirect(`dashboard/${user.username}`);
});

router.get("/:username", async (req, res) => {
  res.render("dashboard.ejs");
});
router.post("/:username/exercises", async (req, res) => {
  console.log("Tried Fetch");
  const { name } = req.body;
  const exercise = new ExerciseModel({
    name: name,
  });
  await exercise.save();
});
router.get("/:username/exercises", async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.user });
    if (!user) res.redirect("/auth/signin");
    console.log(user.exercises);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
