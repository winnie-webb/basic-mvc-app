const { redirectToSigninIfNotAuth } = require("../models/IsUserAuth");
const UserModel = require("../models/Users");
const express = require("express");
const router = require("express").Router();
router.get("/", redirectToSigninIfNotAuth, async (req, res) => {
  const user = await UserModel.findOne({ _id: req.user });

  res.redirect(`/dashboard/${user.username}`);
});
router.use("/:username", express.static("public/dashboard"));
router.get("/:username", redirectToSigninIfNotAuth, async (req, res) => {
  res.render("dashboard.ejs");
});
router.post(
  "/:username/exercises",
  redirectToSigninIfNotAuth,
  async (req, res) => {
    const { newExercises } = req.body;
    const user = await UserModel.findOneAndUpdate({
      _id: req.user,
      exercises: [...newExercises],
    });
    user.save();
  }
);
router.get("/:username/exercises", async (req, res) => {
  res.send({
    exercises: [
      {
        exerciseName: "Pushup",
        date: "Thu Apr 22 2021",
        time: "16:08:42",
      },
      {
        exerciseName: "Pushup",
        date: "Thu Apr 22 2021",
        time: "16:08:42",
      },
    ],
  });
  // try {
  //   const user = await UserModel.findOne({ _id: req.user });
  //   if (!user) res.redirect("/auth/signin");
  //   res.send(JSON.stringify(user.exercises));
  // } catch (err) {
  //   console.log(err);
  // }
});
module.exports = router;
