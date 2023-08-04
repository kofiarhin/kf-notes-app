const { Router } = require("express");
const { getNotesCreateController } = require("../controllers/notesController");
const router = Router();
const { Auth } = require("../middleware/auth");

router.get("/create", Auth, getNotesCreateController);

module.exports = router;
