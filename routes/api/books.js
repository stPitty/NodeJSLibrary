const express = require('express');
const router = express.Router();

const models = require('../../models/models');
const fileMiddleware = require('../../middleware/book-file')


function createData(qty, object) {
  object.books = [];
  let index = 0;
  while (index < qty) {
    let newBook = new models.Book(
      `This is book ${index}`,
      `Info about book ${index}`,
      `K.Mathers`,
      `Some info ${index}`,
      `${index}.file`,
      `name of ${index}`,
      `defaultPath`
    )
    object.books.push(newBook);
    index++
  }
}

const dataBase = {};
createData(4, dataBase);
const { books } = dataBase;

router
  .get('/', (req, res) => {
  res.json(books);
})
  .get('/:id', (req, res) => {
    const { id } = req.params;
    const dbId = books.findIndex(el => el.id === id);

    if (dbId !== -1) {
      res.json(books[dbId]);
    } else {
      res
        .status(404)
        .json({"Error": "File not found"});
    }
  })
  .post('/', (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName, id } = req.body;

    const newBook = new models.Book(title, description, authors, favorite, fileCover, fileName, id);
    books.push(newBook);

    res
      .status(201)
      .json(newBook);
  })
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const dbId = books.findIndex(el => el.id === id);

    const { title, description, authors, favorite, fileCover, fileName} = req.body;

    if (dbId !== -1) {
      if (title) books[dbId].title = title;
      if (description) books[dbId].description = description;
      if (authors) books[dbId].authors = authors;
      if (favorite) books[dbId].favorite = favorite;
      if (fileCover) books[dbId].fileCover = fileCover;
      if (fileName) books[dbId].fileName = fileName;
      res.json(books[dbId]);
    } else {
      res
        .status(404)
        .json({"Error": "File not found"});
    }
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params;
    const dbId = books.findIndex(el => el.id === id);

    if (dbId !== -1) {
      const deletedEl = books.splice(dbId, 1);
      const result = {
        "Action status": "successful",
        "Deleted element": deletedEl[0]
      }
      res
        .json(result);
    } else {
      res
        .status(404)
        .json({"Error": "File not found"});
    }
  })
  .post('/upload-book', fileMiddleware.single('fileBook'), (req, res) => {
    if (req.file) res.json(req.file.path);
    else res.json(null);
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