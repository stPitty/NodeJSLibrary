const express = require('express');
const axios = require('axios');
const router = express.Router();

const Book = require('../models/models');

router
  .get('/', async (req, res) => {
    try {
      const books = await Book.find();
      res.render('books/index', {
        'title': 'Книги',
        'books': books,
      });
    } catch (e) {
      console.error(e);
    }
  })
  .get('/create', (req, res) => {
    res.render('books/update-or-create', {
      'title': 'Добавление новой книги',
      'book': {},
    });
  })
  .post('/create', async (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book({title, description, authors, favorite, fileCover, fileName});
    try {
      await newBook.save();
      res.redirect('/books');
    } catch (e) {
      console.error(e);
    }
  })
  .get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
      const book = await Book.findById(id);

      const DATAURL = process.env.DATAURL || 'http://localhost:3002';

      await axios.post(`${DATAURL}/counter/${id}/incr`);
      const axResp = await axios.get(`${DATAURL}/counter/${id}`);

      res.render('books/view', {
        'title': book.title,
        'book': book,
        'counter': axResp.data.value,
      });
    } catch (e) {
      console.error(e);
      res
        .status(404)
        .redirect('/404');
    }
  })
  .get('/update/:id', async (req, res) => {
    const {id} = req.params;

    try {
      const book = await Book.findById(id);
      res.render('books/update-or-create', {
        'title': book.title,
        'book': book,
      });
    } catch (e) {
      console.error(e);
      res
        .status(404)
        .redirect('/404');
    }
  })
  .post('/update/:id', async (req, res) => {
    const {id} = req.params;
    try {
      const book = await Book.findById(id);
      const {title, description, authors, favorite, fileCover, fileName} = req.body;

      if (title) book.title = title;
      if (description) book.description = description;
      if (authors) book.authors = authors;
      if (favorite) book.favorite = favorite;
      if (fileCover) book.fileCover = fileCover;
      if (fileName) book.fileName = fileName;

      await book.save();
      res.redirect(`/books/${id}`);
    } catch (e) {
      console.error(e);
      res
        .status(404)
        .redirect('/404');
    }
  })
  .post('/delete/:id', async (req, res) => {
    const {id} = req.params;
    try {
      await Book.deleteOne({_id: id});
      res.redirect('/books');
    } catch (e) {
      console.error(e);
      res
        .status(404)
        .redirect('/404');
    }
  });

module.exports = router;


