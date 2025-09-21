const { listUsers, deleteUser, findUserByUuid } = require('../service/userService');

exports.list = (req, res) => {
  res.json({ usuarios: listUsers() });
};

exports.delete = (req, res) => {
  const { uuid } = req.params;
  try {
    deleteUser(uuid, req.user);
    res.json({ mensagem: 'Usuário excluído com sucesso.' });
  } catch (err) {
    res.status(403).json({ erro: err.message });
  }
};
