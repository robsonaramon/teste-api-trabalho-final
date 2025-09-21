const users = require('../model/User');
const { hashPassword } = require('./authService');

function findUserByEmail(email) {
  return users.find(u => u.email === email);
}

function findUserByUuid(uuid) {
  return users.find(u => u.uuid === uuid);
}

function createUser({ username, email, password }) {
  if (findUserByEmail(email)) {
    throw new Error('E-mail já cadastrado.');
  }
  const user = {
    uuid: require('uuid').v4(),
    username,
    email,
    password: hashPassword(password),
    isAdmin: false
  };
  users.push(user);
  return user;
}

function listUsers() {
  return users.map(({ password, ...rest }) => rest);
}

function deleteUser(uuid, requester) {
  if (!requester.isAdmin) throw new Error('Apenas administradores podem excluir usuários.');
  const idx = users.findIndex(u => u.uuid === uuid);
  if (idx === -1) throw new Error('Usuário não encontrado.');
  users.splice(idx, 1);
}

module.exports = { findUserByEmail, findUserByUuid, createUser, listUsers, deleteUser };
