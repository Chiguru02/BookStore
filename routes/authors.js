const express = require("express");
const Author = require("../models/author");
const router = express.Router();

// Shows all authors
router.get("/", async (req, res) => {
  let authors;
  let aN = {};
  if (req.query.name != null && req.query.name != "") {
    aN.name = new RegExp(req.query.name, "i");
  }
  try {
    authors = await Author.find(aN);
  } catch {
    authors = [];
  }
  res.render("authors/index", {
    authors: authors,
    prevAuthName: req.query.name,
  });
});

// renders form for creating new author
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// creates new author.
// dont need extra ejs file for this as we dont know any confirmation
router.post("/", async (req, res) => {
  const authorModel = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await authorModel.save();
    res.redirect("authors");
  } catch (err) {
    res.render("authors/new", {
      author: authorModel,
      errorMessage: "error creating author",
    });
  }
});

module.exports = router;
