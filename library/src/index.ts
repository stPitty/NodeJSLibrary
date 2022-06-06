import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import http from 'http';
import expressSession from 'express-session';
import 'reflect-metadata';

import {socket, router as chatRouter} from './routes/chat';
import indexRouter from './routes';
import usersApiRouter from './routes/api/users';
import booksApiRouter from './routes/api/books';
import booksRouter from './routes/books';
import usersRouter from './routes/users';
import middleware from './middleware/error';

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 80;
const dataBase = {
  host: process.env.HOSTDB || 'mongodb://localhost:27017',
  name: process.env.DBNAME || 'library',
  password: process.env.DBPASS || 'a123',
  user: process.env.DBUSER || 'root',
};

socket(server);

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
  .set('view engine', 'ejs')
  .use(expressSession({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))
  .use('/', indexRouter)
  .use('/chat', chatRouter)
  .use('/api/user', usersApiRouter)
  .use('/api/books', booksApiRouter)
  .use('/books', booksRouter)
  .use('/users', usersRouter)
  .use(middleware);

async function start() {
  try {
    await mongoose.connect(dataBase.host, {
      user: dataBase.user,
      pass: dataBase.password,
      dbName: dataBase.name,
    });

    server.listen(PORT, () => {
      console.log(`Library is running on port ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
}

start();
