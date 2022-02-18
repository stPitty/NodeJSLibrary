const express = require('express');
const bodyParser = require('body-parser');

const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');


const app = express();
const PORT = 8000;

app
  .use(bodyParser.json())
  .use('/api/user', userRouter)
  .use('/api/books', bookRouter)
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  });




