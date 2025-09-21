const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../model/User');

const SECRET = 'pokesecret';

function generateToken(user) {
  return jwt.sign({ uuid: user.uuid, isAdmin: user.isAdmin }, SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = { generateToken, verifyToken, hashPassword, comparePassword };
