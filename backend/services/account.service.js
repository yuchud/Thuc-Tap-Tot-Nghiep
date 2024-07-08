const sequelize = require("../db-connection");
const accountModel = require("../models/account.model");
const customerModel = require("../models/customer.model");
const { hashPassword, comparePassword } = require("../utils/hashing.util");
const appConfig = require("../config/app.config");
const jwt = require("jsonwebtoken");
const accountService = {
  getAllAccounts: async () => {
    try {
      return await accountModel.findAll();
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },

  getAccountById: async (id) => {
    try {
      return await accountModel.findByPk(id);
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },

  getAccountByUserNameOrEmail: async (usernameOrEmail) => {
    try {
      const account = await accountModel.findOne({
        where: {
          [sequelize.Sequelize.Op.or]: [
            { username: usernameOrEmail },
            { email: usernameOrEmail },
          ],
        },
      });
      return account;
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },

  isUsernameDuplicated: async (username) => {
    try {
      if (!username) return false;
      const account = await accountModel.findOne({
        where: { username: username },
      });
      return account !== null;
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },

  isEmailDuplicated: async (email) => {
    try {
      if (!email) return false;
      const account = await accountModel.findOne({ where: { email: email } });
      return account !== null;
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },

  createAccount: async (account) => {
    try {
      let account_id = null;
      await sequelize.transaction(async (t) => {
        const newAccount = await accountModel.create(account, {
          transaction: t,
        });
        account_id = newAccount.id;
        await customerModel.create(
          {
            account_id: account_id,
            account_role_id: newAccount.account_role_id,
          },
          { transaction: t }
        );
      });
      return { message: "Create account successfully", account_id: account_id };
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },

  updatePassword: async (account_id, newPassword) => {
    try {
      const hashedPassword = await hashPassword(newPassword);
      accountModel.update(
        { password: hashedPassword },
        { where: { id: account_id } }
      );
      return { message: "Update password successfully" , account_id: account_id};
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },

  isPasswordCorrect: async (password, hashedPassword) => {
    try {
      const isPasswordCorrect = await comparePassword(password, hashedPassword);
      if (!isPasswordCorrect) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },

  getToken: async (account) => {
    try {
      const account_id = account.id;
      const user = await accountService.getAccountById(account_id);
      jwt.sign(
        { id: user.id, role: user.account_role_id },
        appConfig.JWT_SECRET,
        { expiresIn: `${appConfig.LOGIN_TOKEN_EXPIRATION}s` }
      );
      return { message: "Login successfully" };
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },
  deleteAccount: async (account_id) => {
    try {
      const account = await accountModel.findByPk(account_id);
      if (!account) {
        return { error: "Account not found" };
      }
      await sequelize.transaction(async (t) => {
        await customerModel.destroy({ where: { account_id: account_id } }, { transaction: t});
        await accountModel.destroy({ where: { id: account_id } }, { transaction: t});
      });
      return { message: "Delete account successfully" };
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },
};
module.exports = accountService;
