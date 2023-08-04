const { Router } = require("express");
const { getIndex, getError } = require("../controllers/pagesController");
const router = Router();

router.get("/", getIndex);
router.get("/error", getError);
module.exports = router;
