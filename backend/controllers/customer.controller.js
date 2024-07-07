const customerService = require("../services/customer.service");
const baseController = require("./base.controller");

const customerController = {
  createCustomer: async function (req, res) {
    const customer = req.body;
    baseController.handleRequest(
      () => customerService.createCustomer(customer),
      req,
      res
    );
  },
  getCustomerById: async function (req, res) {
    const id = req.params.id;
    baseController.handleRequest(
      () => customerService.getCustomerById(id),
      req,
      res
    );
  },
};

module.exports = customerController;
