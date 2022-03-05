const express = require('express');
const redis = require('redis');

const app = express();
const rcli = redis.createClient({url: process.env.REDISURL || 'redis://localhost:3001'});
const PORT = process.env.PORT || 3002;

(async () => {
  await rcli.connect()
})();

app
  .post('/counter/:bookId/incr', async (req, res) => {
  const { bookId } = req.params;

  try {
    const cnt = await rcli.incr(bookId);
    res
      .status(201)
      .json({
        id: bookId,
        count: cnt,
      })
  } catch (e) {
    res
      .status(500)
      .json({
        Error: `Ошибка redis ${e}`,
      })
  }
})
  .get('/counter/:bookId', async (req, res) => {
    const { bookId } = req.params;

    try {
      const cnt = await rcli.get(bookId);
      if (cnt) {
        res
          .status(200)
          .json({
            id: bookId,
            value: cnt,
          })
      } else {
        res
          .status(404)
          .json({
            Error: `Cannot find`
          })
      }
    } catch (e) {
      res
        .status(500)
        .json({Error: e})
    }
  })
  .listen(PORT, () => {
    console.log(`Counter is running on port ${PORT}`)
  });