const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const ConnectToDb = require("./models/ConnectToDb");
ConnectToDb();

const publicDirPath = "./public";
const viewsDirPath = "./views";

app.use(express.static(publicDirPath));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", viewsDirPath);

// Initialize Routes
const ExcerciseRouter = require("./routes/ExcerciseRouter");
const AuthRouter = require("./routes/AuthRouter");
app.use("/", AuthRouter);
app.listen(PORT, () => console.log("Server has started"));
