const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const users = [
    {
        uuid: "31081482-53b7-4fe6-bea3-7409cec27249",
        username: 'admin',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        uuid: uuidv4(),
        username: 'ash',
        email: 'ash@red.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    }
];

module.exports = users;
