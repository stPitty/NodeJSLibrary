const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 80;
const dataBase = {
  host: process.env.HOSTDB || 'mongodb://localhost:27017',
  name: process.env.DBNAME || 'library',
  password: process.env.DBPASS || 'a123',
  user: process.env.DBUSER || 'root',
};

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
  .set('view engine', 'ejs')
  .use(require('express-session')({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))
  .use('/', require('./routes/index'))
  .use('/api/user', require('./routes/api/users'))
  .use('/api/books', require('./routes/api/books'))
  .use('/books', require('./routes/books'))
  .use('/users', require('./routes/users'))
  .use(require('./middleware/error'));

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



