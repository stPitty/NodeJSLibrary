const express = require('express');
const router = express.Router();

router.post('/login/', (req, res) => {
  const { id, mail } = req.body;

  res
    .status(201)
    .json({ id: id || 1, mail: mail || 'test@mail.ru' });
});

module.exports = router;


