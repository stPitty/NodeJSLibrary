import express from 'express';
import axios from 'axios';

import Book from '../models/books';
import {iocContainerBooks} from '../services/ioc-container';
import {AbstractBooksRepository} from '../services/abstract-services';

const repo = iocContainerBooks.get(AbstractBooksRepository);

const router = express.Router();
router
  .get('/', async (req, res) => {
    try {
      const books = await repo.getBooks();
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
      await repo.createBook(newBook);
      res.redirect('/books');
    } catch (e) {
      console.error(e);
    }
  })
  .get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
      const book = await repo.getBook(id);

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
      const book = await repo.getBook(id);
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
      const book = {
        title: req.body.title,
        description: req.body.description,
        authors: req.body.authors,
        favorite: req.body.favorite,
        fileCover: req.body.fileCover,
        fileName: req.body.fileName,
      };

      await repo.updateBook(id, book);
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
      await repo.deleteBook(id);
      res.redirect('/books');
    } catch (e) {
      console.error(e);
      res
        .status(404)
        .redirect('/404');
    }
  });

export = router;


