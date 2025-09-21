const { verifyToken } = require('../service/authService');

module.exports = ({ req }) => {
    const auth = req.headers.authorization || '';
    if (!auth.startsWith('Bearer ')) return { user: null };
    const token = auth.split(' ')[1];
    const user = verifyToken(token);
    return { user };
};
