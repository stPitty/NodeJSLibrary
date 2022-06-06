import express from 'express';
const router = express.Router();

import Book from '../../models/books';
import fileMiddleware from '../../middleware/book-file';
import {iocContainerBooks} from '../../services/ioc-container';
import {AbstractBooksRepository} from '../../services/abstract-services';

const repo = iocContainerBooks.get(AbstractBooksRepository);


router
  .get('/', async (req, res) => {
    try {
      const books = await repo.getBooks();
      res.json(books);
    } catch (e) {
      console.error(e);
    }
  })
  .get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
      const book = await repo.getBook(id);
      res.json(book);
    } catch (e) {
      console.error(e);
      res
        .status(404)
        .json({'Error': 'File not found'});
    }
  })
  .post('/', async (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    try {
      const newBook = new Book({title, description, authors, favorite, fileCover, fileName});
      await repo.createBook(newBook);
      res
        .status(201)
        .json(newBook);
    } catch (e) {
      console.error(e);
    }
  })
  .put('/:id', async (req, res) => {
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

      res
        .status(201)
        .json(book);
    } catch (e) {
      console.error(e);
      res
        .status(404)
        .json({'Error': 'File not found'});
    }
  })
  .delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
      const book = await repo.deleteBook(id);
      res.json({
        'Action status': 'successful',
        'Deleted element': book,
      });
    } catch (e) {
      console.error(e);
      res
        .status(404)
        .json({'Error': 'File not found'});
    }
  })
  .post('/upload-book', fileMiddleware.single('fileBook'), (req, res) => {
    if (req.file) {
      res.json(req.file.path);
    } else {
      res.json(null);
    }
  })
  .get('/:id/download', (req, res) => {
    const {id} = req.params;
    const path = `userdata/library/${id}`;
    res.download(path, id, (err) => {
      if (err) {
        res
          .status(404)
          .json({'Error': 'File not found'});
      }
    });
  });

export = router;
