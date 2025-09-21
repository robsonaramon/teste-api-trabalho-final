const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { verifyToken } = require('../service/authService');

router.get('/', (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ erro: 'Token não fornecido.' });
  const token = auth.split(' ')[1];
  const user = verifyToken(token);
  if (!user) return res.status(401).json({ erro: 'Token inválido.' });
  req.user = user;
  next();
}, userController.list);

router.delete('/:uuid', (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ erro: 'Token não fornecido.' });
  const token = auth.split(' ')[1];
  const user = verifyToken(token);
  if (!user) return res.status(401).json({ erro: 'Token inválido.' });
  req.user = user;
  next();
}, userController.delete);

module.exports = router;
