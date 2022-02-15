const models = require('./models/models.js');
const express = require('express');
const bodyParser = require('body-parser')


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
      `name of ${index}`
    )
    object.books.push(newBook);
    index++
  }
}


const dataBase = {};
createData(4, dataBase);

const app = express();
const { books } = dataBase;
const PORT = 8000;

app
  .use(bodyParser.json())
  .post('/api/user/login/', (req, res) => {
    const { id, mail } = req.body;

    res
      .status(201)
      .json({ id: id || 1, mail: mail || "test@mail.ru" })
  })
  .get('/api/books/', (req, res) => {
    res.json(books);
})
  .get('/api/books/:id', (req, res) => {
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
  .post('/api/books/', (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName, id } = req.body;

    const newBook = new models.Book(title, description, authors, favorite, fileCover, fileName, id);
    books.push(newBook);

    res
      .status(201)
      .json(newBook);
  })
  .put('/api/books/:id', (req, res) => {
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
  .delete('/api/books/:id', (req, res) => {
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
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  });




