const db = require("../src/db-connection");
const jwt = require("jsonwebtoken");
const AccountModel = require("../models/account.model");
const handleSequelizeError = require("../utils/sequelize-error-handler.util");
const appConfig = require("../config/app.config");
const { hashPassword, comparePassword } = require("../utils/hashing.utils");

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
  createAccount: async function (accountData) {
    try {
      const account = await AccountModel.create(accountData);
      return account.id;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  getAccountById: async function (id) {
    try {
      const account = await AccountModel.findByPk(id);
      if (!account) {
        throw new Error("Account not found");
      }
      return account;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  isPasswordCorrect: async function (firstPassword, secondPassword) {
    return await comparePassword(firstPassword, secondPassword);
  },
  updatePassword: async function (id, newPassword) {
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
