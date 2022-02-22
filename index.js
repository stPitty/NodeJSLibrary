const express = require('express');
const bodyParser = require('body-parser');

const bookApiRouter = require('./routes/api/books');
const userApiRouter = require('./routes/api/users');
const bookRouter = require('./routes/books');
const indexRouter = require('./routes/index')
const error = require('./middleware/error');


const app = express();
const PORT = process.env.PORT || 8000;

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
  .set('view engine', 'ejs')
  .use('/', indexRouter)
  .use('/api/user', userApiRouter)
  .use('/api/books', bookApiRouter)
  .use('/books', bookRouter)
  .use(error)
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  });




