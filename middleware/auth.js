const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const Auth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.render("error", { message: "unauthorized Access" });

  // verify token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, data) => {
    if (error) return render("error", { message: "Unauthorized Access" });

    const user = await User.findById(data.id);

    if (!user) return render("error", { message: "User not found!" });
    req.user = user;
    next();
  });
};

module.exports = {
  Auth,
};
