const express = require('express');
const router = express.Router();

const Book = require('../../models/models');
const fileMiddleware = require('../../middleware/book-file')


router
  .get('/', async (req, res) => {
  try {
    const books = await Book.find().select('-__v');
    res.json(books)
  } catch (e) {
    console.error(e);
  }
})
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const book = await Book.findById(id).select('-__v');
      res.json(book);
    } catch (e) {
      console.error(e);
      res
        .status(404)
        .json({"Error": "File not found"});
    }
  })
  .post('/', async (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName} = req.body;
    try {
      const newBook = new Book({title, description, authors, favorite, fileCover, fileName})
      await newBook.save();
      res
        .status(201)
        .json(newBook);
    } catch (e) {
      console.error(e)
    }
  })
  .put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const book = await Book.findById(id).select('-__v');

      const {title, description, authors, favorite, fileCover, fileName} = req.body;

      if (title) book.title = title;
      if (description) book.description = description;
      if (authors) book.authors = authors;
      if (favorite) book.favorite = favorite;
      if (fileCover) book.fileCover = fileCover;
      if (fileName) book.fileName = fileName;

      await book.save()
      res
        .status(201)
        .json(book);

    } catch (e) {
      console.error(e);
      res
        .status(404)
        .json({"Error": "File not found"});
    }
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const book = await Book.findById(id).select('-__v');
      await Book.deleteOne({_id: id})
      res.json({
        "Action status": "successful",
        "Deleted element": book,
      })
    } catch (e) {
      console.error(e);
      res
        .status(404)
        .json({"Error": "File not found"});
    }
  })
  .post('/upload-book', fileMiddleware.single('fileBook'), (req, res) => {
    if (req.file) {
      res.json(req.file.path);
    }
    else {
      res.json(null);
    }
  })
  .get('/:id/download', (req, res) => {
    const { id } = req.params;
    const path = `userdata/library/${id}`;
    res.download(path, id, err => {
      if (err) {
        res
          .status(404)
          .json({"Error": "File not found"});
      }
    })
});

module.exports = router