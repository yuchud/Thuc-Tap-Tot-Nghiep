const db = require("../db");
const jwt = require("jsonwebtoken");
const AccountModel = require("../models/AccountModel");
const handleSequelizeError = require("../utils/SequelizeErrorHandler");

const accountModel = {
  isAccountDuplicated: async function (usernameOrEmail) {
    try {
      const account = await AccountModel.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { username: usernameOrEmail },
            { email: usernameOrEmail },
          ],
        },
      });
      return account != null;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  isEmailDuplicated: async function (email) {
    try {
      const account = await AccountModel.findOne({ where: { email: email } });
      return account !== null;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  isUsernameDuplicated: async function (username) {
    try {
      const account = await AccountModel.findOne({
        where: { username: username },
      });
      return account !== null;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  createAccount: async function (account) {
    try {
      const result = await AccountModel.create(account);
      return result.dataValues.id;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  getAccountById: async function (id) {
    try {
      return await AccountModel.findByPk(id);
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  isPasswordCorrect: async function (user_password, password) {
    return (await user_password) === password;
  },
  updatePassword: async function (id, password) {
    try {
      const result = await AccountModel.update(
        { password: password },
        { where: { id: id } }
      );
      return result !== null;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  changeUsername: async function (id, username) {
    try {
      const result = await AccountModel.update(
        { username: username },
        { where: { id: id } }
      );
      return result.affectedRows > 0;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  getAccountByUserNameOrEmail: async function (usernameOrEmail) {
    try {
      return await AccountModel.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { username: usernameOrEmail },
            { email: usernameOrEmail },
          ],
        },
      });
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  deleteAccount: async function (id) {
    try {
      const [result] = await db.query("DELETE FROM accounts WHERE id = ?", [
        id,
      ]);
      return result.affectedRows > 0;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  getToken: async function (user) {
    const token = jwt.sign({ id: user.id , role: user.account_role_id}, process.env.JWT_SECRET);
    return { token: token, message: "Login successfully" };
  },
};

module.exports = accountModel;
