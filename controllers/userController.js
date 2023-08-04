const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const homePage = (req, res) => {
  res.render("index");
};

// get register
const getRegisterController = (req, res) => {
  res.render("register");
};

const getLoginController = (req, res) => {
  res.render("login");
};

// create user
const createUserController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();
    res.redirect("/users/login");
  } catch (error) {
    console.log(error);
    res.status(400).render("error", { message: "someting went wrong" });
  }
};

// login user
// @route /users/login

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .satus(400)
        .render("error", { message: "check details and try again" });

    // compare password
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      return res.status(400).render("error", "Check details and try again");

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res.cookie("token", token);
    res.redirect("home");
  } catch (error) {
    console.log(error);
  }
};

const getHomeController = (req, res) => {
  console.log(req.user);
  res.render("home", {
    user: {
      name: req.user.name,
      email: req.user.email,
    },
    layout: "./layout/home",
  });
};

const logoutController = (req, res) => {
  res.clearCookie("token");
  res.redirect("login");
};
module.exports = {
  homePage,
  getRegisterController,
  getLoginController,
  createUserController,
  loginController,
  getHomeController,
  logoutController,
};
