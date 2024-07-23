const baseController = require('./base.controller');
const accountService = require('../services/account.service');
const errorTypes = require('../utils/status-code.util');
const http = require('http-status-codes');
const appConfig = require('../config/app.config');

const accountController = {
  getAllAccounts: async (req, res) => {
    const { page, limit } = req.query;
    try {
      const accounts = await accountService.getAllAccounts(page, limit);
      res.status(http.StatusCodes.OK).json(accounts);
    } catch (error) {
      res
        .status(http.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },

  getAccountById: async (req, res) => {
    const account_id = req.params.id;
    try {
      const account = await accountService.getAccountById(account_id);
      if (account) {
        res.status(http.StatusCodes.OK).json(account);
      } else {
        res
          .status(http.StatusCodes.NOT_FOUND)
          .json({ error: errorTypes.Account.ACCOUNT_NOT_FOUND });
      }
    } catch (error) {
      res
        .status(http.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },

  createAccount: async (req, res) => {
    const account = req.body;
    try {
      const isUsernameDuplicated = await accountService.isUsernameDuplicated(
        account.username
      );
      if (isUsernameDuplicated) {
        res
          .status(http.StatusCodes.BAD_REQUEST)
          .json({ error: 'Username is already used' });
        return;
      }
      const isEmailDuplicated = await accountService.isEmailDuplicated(
        account.email
      );
      if (isEmailDuplicated) {
        res
          .status(http.StatusCodes.BAD_REQUEST)
          .json({ error: 'Email is already used' });
        return;
      }
      const result = await accountService.createAccount(account);
      res.status(http.StatusCodes.CREATED).json(result);
    } catch (error) {
      res
        .status(http.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },

  updatePassword: async (req, res) => {
    const account_id = req.params.id;
    const newPassword = req.body.password;
    // console.log(account_id, newPassword);
    try {
      const result = await accountService.updatePassword(
        account_id,
        newPassword
      );
      res.status(http.StatusCodes.OK).json(result);
    } catch (error) {
      res
        .status(http.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const usernameOrEmail = req.body.usernameOrEmail;
      const password = req.body.password;
      const account = await accountService.getAccountByUserNameOrEmail(
        usernameOrEmail
      );
      if (!account) {
        res
          .status(http.StatusCodes.UNAUTHORIZED)
          .json({ error: 'Username or email not found' });
        return;
      }

      if (account.account_role_id === appConfig.USER_ROLE.ADMIN) {
        res
          .status(http.StatusCodes.UNAUTHORIZED)
          .json({ error: 'Username is already used' });
        return;
      }

      const isPasswordCorrect = await accountService.isPasswordCorrect(
        password,
        account.password
      );

      if (!isPasswordCorrect) {
        res
          .status(http.StatusCodes.UNAUTHORIZED)
          .json({ error: 'Password is incorrect' });
        return;
      }
      // console.log(account);
      const loginResult = await accountService.getToken(account);
      res.status(http.StatusCodes.OK).json(loginResult);
    } catch (error) {
      res
        .status(http.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },

  adminLogin: async (req, res) => {
    try {
      const usernameOrEmail = req.body.usernameOrEmail;
      const password = req.body.password;
      const account = await accountService.getAccountByUserNameOrEmail(
        usernameOrEmail
      );
      if (!account) {
        res
          .status(http.StatusCodes.UNAUTHORIZED)
          .json({ error: 'Username or email not found' });
        return;
      }
      if (account.account_role_id !== appConfig.USER_ROLE.ADMIN) {
        res
          .status(http.StatusCodes.UNAUTHORIZED)
          .json({ error: 'You are not allowed to login here' });
        return;
      }

      const isPasswordCorrect = await accountService.isPasswordCorrect(
        password,
        account.password
      );

      if (!isPasswordCorrect) {
        res
          .status(http.StatusCodes.UNAUTHORIZED)
          .json({ error: 'Password is incorrect' });
        return;
      }
      // console.log(account.id);
      const loginResult = await accountService.getToken(account);
      res.status(http.StatusCodes.OK).json(loginResult);
    } catch (error) {
      res
        .status(http.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },
  updateAccount: async (req, res) => {
    const id = req.params.id;
    const account = req.body;
    const avatar = req.file;
    try {
      const isUsernameDuplicated = await accountService.isUsernameDuplicated(
        account.username,
        id
      );
      if (isUsernameDuplicated) {
        return res
          .status(http.StatusCodes.BAD_REQUEST)
          .json({ message: 'Tên đăng nhập đã được sử dụng' });
      }
      const isEmailDuplicated = await accountService.isEmailDuplicated(
        account.email,
        id
      );
      if (isEmailDuplicated) {
        return res
          .status(http.StatusCodes.BAD_REQUEST)
          .json({ message: 'Email đã được sử dụng' });
      }
      const result = await accountService.updateAccount(id, account, avatar);
      // console.log(result);
      if (result.error) {
        res
          .status(http.StatusCodes.NOT_FOUND)
          .json({ error: errorTypes.Account.ACCOUNT_NOT_FOUND });
        return;
      }
      // console.log(newAccount);
      res.status(http.StatusCodes.OK).json({
        message: 'Cập nhật thông tin tài khoản thành công',
      });
    } catch (error) {
      res
        .status(http.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },

  deleteAccount: async (req, res) => {
    const account_id = req.params.id;
    try {
      const result = await accountService.deleteAccount(account_id);
      if (result.error) {
        res
          .status(http.StatusCodes.NOT_FOUND)
          .json({ error: errorTypes.Account.ACCOUNT_NOT_FOUND });
        return;
      }
      res.status(http.StatusCodes.OK).json(result);
    } catch (error) {
      res
        .status(http.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },
  toggleAccountBannedStatus: async (req, res) => {
    const account_id = req.params.id;
    try {
      const result = await accountService.toggleAccountBannedStatus(account_id);
      if (result.error) {
        res
          .status(http.StatusCodes.NOT_FOUND)
          .json({ error: errorTypes.Account.ACCOUNT_NOT_FOUND });
        return;
      }
      res.status(http.StatusCodes.OK).json(result);
    } catch (error) {
      res
        .status(http.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },
};

module.exports = accountController;
