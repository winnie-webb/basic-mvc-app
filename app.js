if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const session = require("express-session");
const {
  redirectToHomeIfAlreadyAuth,
  redirectToSigninIfNotAuth,
} = require("./models/IsUserAuth");

const app = express();
const PORT = process.env.PORT || 3000;

const ConnectToDb = require("./models/ConnectToDb");
ConnectToDb();

const publicDirPath = "./public";
const viewsDirPath = "./views";

const { SESSION_SECRET, SESSION_NAME, NODE__ENV } = process.env;
const isInProduction = NODE__ENV === "production";

app.use(
  session({
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      secure: isInProduction,
    },
  })
);

app.use(express.static(publicDirPath));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", viewsDirPath);

// Initialize Routes
app.get("/", redirectToSigninIfNotAuth, (req, res) => {
  res.render("index", { greeting: "Hello there" });
});

const ExcerciseRouter = require("./routes/ExcerciseRouter");
const AuthRouter = require("./routes/AuthRouter");
app.use("/auth", AuthRouter);
app.listen(PORT, () => console.log("Server has started"));
