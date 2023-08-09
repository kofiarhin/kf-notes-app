require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const connect = require("./config/db");
const layout = require("express-ejs-layouts");
const userRoutes = require("./routes/userRouter");
const pagesRouter = require("./routes/pagesRouter");
const notesRouter = require("./routes/notesRoute");
// connect to database
connect();

// setup middlewares
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(layout);
app.set("view engine", "ejs");
app.set("layout", "./layout/main");
app.use(express.static("public"));

app.use(pagesRouter);
app.use("/users/", userRoutes);
app.use("/notes", notesRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
