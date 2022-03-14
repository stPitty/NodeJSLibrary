const express = require('express');
const bodyParser = require('body-parser');

const bookApiRouter = require('./routes/api/books');
const userApiRouter = require('./routes/api/users');
const bookRouter = require('./routes/books');
const indexRouter = require('./routes/index')
const error = require('./middleware/error');
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 80;
const dataBase = {
  host: process.env.HOSTDB,
  name: process.env.DBNAME,
  password: process.env.DBPASS,
  user: process.env.DBUSER,
};

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
  .set('view engine', 'ejs')
  .use('/', indexRouter)
  .use('/api/user', userApiRouter)
  .use('/api/books', bookApiRouter)
  .use('/books', bookRouter)
  .use(error);

async function start() {
  try {
    await mongoose.connect(dataBase.host, {
      user: dataBase.user,
      pass: dataBase.password,
      dbName: dataBase.name,
    });

    app.listen(PORT, () => {
      console.log(`Library is running on port ${PORT}`)
    });
  } catch (e) {
    console.error(e);
  }
}

start();



