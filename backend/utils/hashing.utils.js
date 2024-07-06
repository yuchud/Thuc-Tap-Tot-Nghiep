const bcrypt = require('bcrypt');
require('dotenv').config();

const hashPassword = async (password) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};

module.exports = {
    hashPassword,
    comparePassword,
};