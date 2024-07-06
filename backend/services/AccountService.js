// backend/services/accountService.js
const accountRepository = require("../repositories/AccountRepository");
const customerRepository = require("../repositories/CustomerRepository");
const ErrorTypes = require("../utils/ErrorTypes");
const sequelize = require("../db");
const accountService = {
  createAccount: async function (account) {
    const t = await sequelize.transaction();
    try {
      const isUsernameDuplicated = await accountRepository.isUsernameDuplicated(
        account.username,
        { transaction: t }
      );
      if (isUsernameDuplicated) {
        await t.rollback();
        return ErrorTypes.Account.USERNAME_DUPLICATED;
      }

      const isGmailDuplicated = await accountRepository.isEmailDuplicated(
        account.email,
        { transaction: t }
      );
      if (isGmailDuplicated) {
        await t.rollback();
        return ErrorTypes.Account.EMAIL_DUPLICATED;
      }

      const account_id = await accountRepository.createAccount(account, {
        transaction: t,
      });

      await customerRepository.createCustomer(
        { account_id: account_id },
        { transaction: t }
      );

      await t.commit();
      return account_id;
    } catch (error) {
      await t.rollback();
      return { error: error.message };
    }
  },

  getAccountById: async function (id) {
    return await accountRepository.getAccountById(id);
  },

  updatePassword: async function (id, password) {
    return await accountRepository.updatePassword(id, password);
  },

  login: async function (usernameOrEmail, password) {
    const user = await accountRepository.getAccountByUserNameOrEmail(
      usernameOrEmail
    );
    if (!user) {
      return ErrorTypes.Account.NOT_FOUND;
    }

    const isPasswordCorrect = await accountRepository.isPasswordCorrect(
      user.password,
      password
    );
    if (!isPasswordCorrect) {
      return ErrorTypes.Account.WRONG_PASSWORD;
    }

    return accountRepository.getToken(user);
  },
};

module.exports = accountService;
