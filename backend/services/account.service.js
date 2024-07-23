const sequelize = require('../db-connection');
const accountModel = require('../models/account.model');
const { hashPassword, comparePassword } = require('../utils/hashing.util');
const appConfig = require('../config/app.config');
const jwt = require('jsonwebtoken');
const azureStorage = require('../utils/azure-storage.util');
const accountService = {
  getAllAccounts: async (page = 1, limit = 12) => {
    try {
      page = parseInt(page);
      limit = parseInt(limit);
      const offset = (page - 1) * limit;

      const { count, rows } = await accountModel.findAndCountAll({
        where: {
          account_role_id: {
            [sequelize.Sequelize.Op.not]: appConfig.USER_ROLE.ADMIN,
          },
        },
        limit: limit,
        offset: offset,
        attributes: { exclude: ['password'] },
      });
      return {
        total: count,
        accounts: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },

  getAccountById: async (id) => {
    try {
      return await accountModel.findOne({
        where: {
          id: id,
          account_role_id: {
            [sequelize.Sequelize.Op.not]: appConfig.USER_ROLE.ADMIN,
          },
        },
        attributes: { exclude: ['password'] },
      });
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },

  getAdminAccountById: async (id) => {
    try {
      return await accountModel.findOne({
        where: {
          id: id,
          account_role_id: appConfig.USER_ROLE.ADMIN,
        },
        attributes: { exclude: ['password'] },
      });
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

  isUsernameDuplicated: async (username, account_id = null) => {
    try {
      if (!username) return false;
      const account = await accountModel.findOne({
        where: { username: username },
      });
      if (!account) {
        return false;
      }
      if (account && account.id == account_id) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },

  isEmailDuplicated: async (email, account_id = null) => {
    try {
      if (!email) return false;
      const account = await accountModel.findOne({ where: { email: email } });
      if (!account) {
        return false;
      }
      if (account && account.id == account_id) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },

  createAccount: async (account) => {
    try {
      if (account.email === '') {
        account.email = null;
      }
      account.password = await hashPassword(account.password);
      const newAccount = await accountModel.create(account);
      return {
        message: 'Create account successfully',
        account_id: newAccount.id,
      };
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
      return {
        message: 'Update password successfully',
        account_id: account_id,
      };
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
      // console.log(account.id);
      // const account_id = account.id;
      // const user = await accountService.getAccountById(account_id);
      // console.log(account.account_role_id);
      const token = jwt.sign(
        { id: account.id, role: account.account_role_id },
        appConfig.JWT_SECRET,
        { expiresIn: `${appConfig.LOGIN_TOKEN_EXPIRATION}s` }
      );

      return { message: 'Login successfully', token: token };
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },
  updateAccount: async (account_id, account, avatar) => {
    try {
      let imageUrl = null;
      if (avatar) {
        imageUrl = await azureStorage.uploadImage(
          (containerName = 'avatars'), // Azure container name
          avatar
        );
      }

      account.avatar_url = imageUrl ? imageUrl : account.avatar_url;
      if (account.gmail === '') {
        account.gmail = null;
      }
      // console.log(account);
      const updatedAccount = await accountModel.update(account, {
        where: { id: account_id },
      });
      if (!updatedAccount) {
        return null;
      }
      return updatedAccount;
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },
  deleteAccount: async (account_id) => {
    try {
      const account = await accountModel.findByPk(account_id);
      if (!account) {
        return { error: 'Account not found' };
      }
      await sequelize.transaction(async (t) => {
        await customerModel.destroy(
          { where: { account_id: account_id } },
          { transaction: t }
        );
        await accountModel.destroy(
          { where: { id: account_id } },
          { transaction: t }
        );
      });
      return { message: 'Delete account successfully' };
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },
  toggleAccountBannedStatus(account_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const account = await accountModel.findByPk(account_id);
        if (!account) {
          return reject({ error: 'Không tìm thấy tài khoản' });
        }
        account.is_banned = !account.is_banned;
        await account.save();
        resolve({ message: 'Thay đổi trạng thái khóa tài khoản thành công' });
      } catch (error) {
        console.error(error);
        reject({ error: error.message });
      }
    });
  },
};
module.exports = accountService;
