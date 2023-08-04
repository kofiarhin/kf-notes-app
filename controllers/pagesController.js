const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const getIndex = (req, res) => {
  res.render("index");
};

const getHome = (req, res) => {
  res.render("home");
};

const getError = (req, res) => {
  // check if there is token;
  const token = req.cookies.token;
  let layout = "./layout/main";
  let user;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, data) => {
      user = await User.findById(data.id);
      return res.render("error", {
        layout: "./layout/home",
        user,
      });
    });
  } else {
    res.render("error", {
      layout: "./layout/main",
    });
  }
};

module.exports = {
  getIndex,
  getHome,
  getError,
};
