const db = require("../db-connection");
const jwt = require("jsonwebtoken");
const AccountModel = require("../models/account.model");
const handleSequelizeError = require("../utils/sequelize-error-handler.util");
const appConfig = require("../config/app.config");
const { hashPassword, comparePassword } = require("../utils/hashing.util");

const accountModel = {
  isAccountDuplicated: async (usernameOrEmail) => {
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
  isEmailDuplicated: async (email) => {
    try {
      const account = await AccountModel.findOne({ where: { email: email } });
      return account !== null;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  isUsernameDuplicated: async (username) => {
    try {
      const account = await AccountModel.findOne({
        where: { username: username },
      });
      return account !== null;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  getAllAccounts: async () => {
    try {
      const accounts = await AccountModel.findAll();
      return accounts;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  getAccountById: async (id) => {
    try {
      const account = await AccountModel.findByPk(id);
      if (!account) {
        return { error: "Account not found" };
      }
      return account;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  getAccountByUserNameOrEmail: async (usernameOrEmail) => {
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
  createAccount: async (accountData) => {
    try {
      const account = await AccountModel.create(accountData);
      return account.id;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  isPasswordCorrect: async (firstPassword, secondPassword) => {
    return await comparePassword(firstPassword, secondPassword);
  },
  updatePassword: async (id, newPassword) => {
    try {
      const hashedPassword = await hashPassword(newPassword);
      const [updateCount] = await AccountModel.update(
        { password: hashedPassword },
        { where: { id: id } }
      );
      return updateCount > 0;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  updateUsername: async function (id, newUsername) {
    try {
      const result = await AccountModel.update(
        { username: newUsername },
        { where: { id: id } }
      );
      return result.affectedRows > 0;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  deleteAccount: async function (id) {
    try {
      const result = await AccountModel.destroy({ where: { id: id } });
      return result > 0;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  getToken: async function (account_id) {
    const user = await this.getAccountById(account_id);
    const token = jwt.sign(
      { id: user.id, role: user.account_role_id },
      appConfig.JWT_SECRET,
      { expiresIn: `${appConfig.LOGIN_TOKEN_EXPIRATION}s` }
    );
    return { token: token, message: "Login successfully" };
  },
};

module.exports = accountModel;
