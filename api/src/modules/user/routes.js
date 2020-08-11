const { Router } = require('express');
const { getAll } = require('./entity.js');

const router = Router();

router.get('/test', (req, res) => {
  res.send('OK');
});

router.get('/', (req, res, next) => {
  getAll()
    .then((users) => res.send(users))
    .catch((err) => next(err));
});
module.exports = router;
