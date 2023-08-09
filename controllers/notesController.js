const Note = require("../model/noteModel");

const HOMELAYOUT = "./layout/home";
const getNoteHomeController = async (req, res) => {
  // get notes

  try {
    const notes = await Note.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });

    console.log(notes);
    res.render("notes/home", {
      layout: "./layout/home",
      user: req.user,
      notes,
    });
  } catch (error) {}
};

const getNotesCreateController = (req, res) => {
  res.render("notes/create", {
    layout: HOMELAYOUT,
    user: {
      name: req.user.name,
      email: req.user.email,
    },
  });
};

const createNotesController = async (req, res) => {
  const { title, text } = req.body;

  try {
    const note = new Note({
      owner: req.user._id,
      title,
      text,
    });
    await note.save();
    res.redirect("/notes/home");
  } catch (error) {
    console.log(error);
  }
};

const getNoteController = async (req, res) => {
  const id = req.params.id;

  try {
    const note = await Note.findById(id);

    if (!note) return res.render("error");
    res.render("notes/view", {
      layout: HOMELAYOUT,
      user: req.user,
      note,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateNoteController = async (req, res) => {
  const noteId = req.params.id;
  const { title, text } = req.body;

  console.log(title, text);

  try {
    const note = await Note.findById(noteId);
    if (!note) return res.render("error");

    note.title = title ? title : note.title;
    note.text = text ? text : note.text;

    await note.save();

    res.redirect("/notes/home");
  } catch (error) {
    console.log(error);
  }
};

const deleteNoteController = async (req, res) => {
  const noteId = req.params.id;

  try {
    await Note.deleteOne({ _id: noteId });
    res.redirect("/notes/home");
  } catch (error) {
    cohsole.log(error);
  }
};

// search post
const searchPostController = async (req, res) => {
  try {
    const { searchItem } = req.body;
    const sanitizedSearchParam = searchItem.replace(/[^\w\s]/gi, "");
    const notes = await Note.find({
      $and: [
        {
          $or: [
            { title: { $regex: sanitizedSearchParam, $options: "i" } },
            { text: { $regex: sanitizedSearchParam, $options: "i" } },
          ],
        },
        { owner: req.user._id },
      ],
    }).sort({ createdAt: -1 });

    res.render("notes/search", {
      layout: HOMELAYOUT,
      user: req.user,
      searchItem,
      notes,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getNotesCreateController,
  createNotesController,
  getNoteHomeController,
  getNoteController,
  updateNoteController,
  deleteNoteController,
  searchPostController,
};
