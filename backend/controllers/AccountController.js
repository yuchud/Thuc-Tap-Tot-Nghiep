const baseController = require('./BaseController');
const accountService = require('../services/AccountService');


const accountController = {
    createAccount: async function(req, res) {
        const account = req.body;
        baseController.handleRequest(() => accountService.createAccount(account), req, res);
    },

    getAccountById: async function(req, res) {
        const id = req.params.id;
        baseController.handleRequest(() => accountService.getAccountById(id), req, res);
    },

    updatePassword: async function(req, res) {
        const id = req.params.id;
        const password = req.body.password;
        baseController.handleRequest(() => accountService.updatePassword(id, password), req, res);
    },

    login: async function(req, res) {
        const usernameOrEmail = req.body.usernameOrEmail;
        const password = req.body.password;
        baseController.handleRequest(() => accountService.login(usernameOrEmail, password), req, res);
    }

};

module.exports = accountController;