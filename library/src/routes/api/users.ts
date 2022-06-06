import express from 'express';
const router = express.Router();


router.post('/login/', (req, res) => {
  const {id, mail} = req.body;

  res
    .status(201)
    .json({id: id || 1, mail: mail || 'test@mail.ru'});
});

export default router;


