const accountRepository = require("../repositories/account.repository");
const customerRepository = require("../repositories/customer.repository");
const ErrorTypes = require("../utils/error-types.util");
const sequelize = require("../src/db-connection");

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
        account_id,
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
    return accountRepository.getAccountById(id);
  },

  updatePassword: async function (id, newPassword) {
    return accountRepository.updatePassword(id, newPassword);
  },

  login: async function (usernameOrEmail, password) {
    const user = await accountRepository.getAccountByUserNameOrEmail(
      usernameOrEmail
    );
    if (!user) {
      return ErrorTypes.Account.NOT_FOUND;
    }

    const isPasswordCorrect = accountRepository.isPasswordCorrect(password, user.password);
    if (!isPasswordCorrect) {
      return ErrorTypes.Account.WRONG_PASSWORD;
    }

    return accountRepository.getToken(user.id);
  },
};

module.exports = accountService;
