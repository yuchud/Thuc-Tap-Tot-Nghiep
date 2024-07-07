const baseController = require("./base.controller");
const accountService = require("../services/account.service");

const accountController = {
  getAllAccounts: (req, res) => {
    baseController.handleRequest(
      () => accountService.getAllAccounts(),
      req,
      res
    );
  },

  getAccountById: (req, res) => {
    const id = req.params.id;
    baseController.handleRequest(
      () => accountService.getAccountById(id),
      req,
      res
    );
  },

  createAccount: (req, res) => {
    const account = req.body;
    baseController.handleRequest(
      () => accountService.createAccount(account),
      req,
      res
    );
  },

  updatePassword: (req, res) => {
    const id = req.params.id;
    const password = req.body.password;
    baseController.handleRequest(
      () => accountService.updatePassword(id, password),
      req,
      res
    );
  },

  login: (req, res) => {
    const usernameOrEmail = req.body.usernameOrEmail;
    const password = req.body.password;
    baseController.handleRequest(
      () => accountService.login(usernameOrEmail, password),
      req,
      res
    );
  },
};

module.exports = accountController;
