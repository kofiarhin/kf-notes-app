const getNotesCreateController = (req, res) => {
  res.render("notes/create", {
    layout: "./layout/home",
    user: {
      name: req.user.name,
      email: req.user.email,
    },
  });
};

module.exports = {
  getNotesCreateController,
};
