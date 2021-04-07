if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const passport = require("passport");
const methodOverride = require("method-override");
const UserModel = require("./models/Users");
const { redirectToSigninIfNotAuth } = require("./models/IsUserAuth");

const app = express();
const PORT = process.env.PORT || 3000;

const ConnectToDb = require("./models/ConnectToDb");
ConnectToDb();

const publicDirPath = "./public";
const viewsDirPath = "./views";

const { SESSION_SECRET, SESSION_NAME, NODE__ENV, DB_URI } = process.env;
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
    store: MongoStore.create({
      mongoUrl: DB_URI,
    }),
  })
);
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(publicDirPath));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", viewsDirPath);

// Initialize Routes
app.get("/", async (req, res) => {
  const id = req.user;
  const isUserFromMySite = req.query.frommysite === "admin";

  if (isUserFromMySite) {
    return res.render("index", {
      greeting: `Hi Admin Person`,
      auth: true,
    });
  }

  const isAuth = id ? true : false;
  if (isAuth) {
    const user = await UserModel.findById({ _id: id });
    return res.render("index", {
      greeting: `Hi ${user.username}`,
      auth: isAuth,
    });
  }

  res.render("index", { auth: false });
});

const ExcerciseRouter = require("./routes/ExcerciseRouter");
const AuthRouter = require("./routes/AuthRouter");
app.use("/auth", AuthRouter);
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
