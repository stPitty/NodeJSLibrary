const express = require('express');
const router = express.Router();

const models = require('../models/models');
const { books } = models.dataBase;

router
  .get('/', (req, res) => {
    res.render('books/index', {
      title: 'Книги',
      'books': books,
    })
  })
  .get('/create', (req, res) => {
    res.render('books/update-or-create', {
      title: 'Добавление новой книги',
      'book': {},
    })
  })
  .post('/create', (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName, id } = req.body;

    const newBook = new models.Book(title, description, authors, favorite, fileCover, fileName, id);
    books.push(newBook);

    res.redirect('/books');
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;
    const dbId = books.findIndex(el => el.id === id);

    if (dbId !== -1) {
      res.render('books/view', {
        title: books[dbId].title,
        'book': books[dbId],
      });
    } else {
      res
        .status(404)
        .redirect('/404');
    }
  })
  .get('/update/:id', (req, res) => {
    const { id } = req.params;
    const dbId = books.findIndex(el => el.id === id);

    if (dbId !== -1) {
      res.render('books/update-or-create', {
        title: books[dbId].title,
        'book': books[dbId],
      });
    } else {
      res
        .status(404)
        .redirect('/404');
    }
  })
  .post('/update/:id', (req, res) => {
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
      res.redirect(`/books/${id}`);
    } else {
      res
        .status(404)
        .redirect('/404');
    }
  })
  .post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const dbId = books.findIndex(el => el.id === id);

    if (dbId !== -1) {
      const deletedEl = books.splice(dbId, 1);
      res.redirect('/books');
    } else {
      res
        .status(404)
        .redirect('/404')
    }
  });

module.exports = router





