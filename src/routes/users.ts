const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', (req: Request, res:Response) => {
  res.send('Hello, TypeScript Node Express!');
});

module.exports = router;
