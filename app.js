if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const passport = require("passport");
const methodOverride = require("method-override");
const { redirectToDashboardIfAlreadyAuth } = require("./models/IsUserAuth");
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
app.get("/", redirectToDashboardIfAlreadyAuth, async (req, res) => {
  res.render("index");
});
const AuthRouter = require("./routes/AuthRouter");
const DashboardRouter = require("./routes/DashboardRouter");
app.use("/auth", AuthRouter);
app.use("/dashboard", DashboardRouter);
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
