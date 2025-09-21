const express = require('express');
const router = express.Router();
const pokemonController = require('../controller/pokemonController');
const { verifyToken } = require('../service/authService');

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ erro: 'Token não fornecido.' });
  const token = auth.split(' ')[1];
  const user = verifyToken(token);
  if (!user) return res.status(401).json({ erro: 'Token inválido.' });
  req.user = user;
  next();
}

router.get('/', authMiddleware, pokemonController.list);
router.post('/', authMiddleware, pokemonController.create);
router.put('/:uuid', authMiddleware, pokemonController.update);
router.delete('/:uuid', authMiddleware, pokemonController.delete);

module.exports = router;
