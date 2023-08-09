const { Router } = require("express");
const {
  getNotesCreateController,
  createNotesController,
  getNoteHomeController,
  getNoteController,
  updateNoteController,
  deleteNoteController,
} = require("../controllers/notesController");
const router = Router();
const { Auth } = require("../middleware/auth");

router.get("/home", Auth, getNoteHomeController);
router.get("/create", Auth, getNotesCreateController);
router.get("/:id", Auth, getNoteController);
router.post("/create", Auth, createNotesController);
router.put("/notes/:id", Auth, updateNoteController);
router.delete("/notes/:id", Auth, deleteNoteController);

module.exports = router;
