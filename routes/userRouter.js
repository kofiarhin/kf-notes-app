const { Router } = require("express");
const {
  homePage,
  getRegisterController,
  getLoginController,
  createUserController,
  loginController,
  getHomeController,
  logoutController,
} = require("../controllers/userController");
const { Auth } = require("../middleware/auth");
const router = Router();

router.get("/", homePage);
router.get("/login", getLoginController);
router.get("/register", getRegisterController);
router.post("/register", createUserController);
router.post("/login", loginController);
router.get("/home", Auth, getHomeController);
router.get("/logout", logoutController);
router.get("/*", (req, res) => {
  res.redirect("/error");
});

module.exports = router;
