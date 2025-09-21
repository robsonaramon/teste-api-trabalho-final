const { generateToken, comparePassword } = require('../service/authService');
const { findUserByEmail, createUser } = require('../service/userService');

exports.register = (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = createUser({ username, email, password });
        res.status(201).json({ mensagem: 'Usuário registrado com sucesso.', user: { uuid: user.uuid, username: user.username, email: user.email } });
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    const user = findUserByEmail(email);
    if (!user) return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
    if (!comparePassword(password, user.password)) return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
    const token = generateToken(user);
    res.json({ mensagem: 'Login realizado com sucesso.', token, user: { uuid: user.uuid, username: user.username, email: user.email } });
};
