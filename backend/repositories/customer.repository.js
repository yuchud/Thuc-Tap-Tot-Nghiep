const CustomerModel = require("../models/customer.model");
const handleSequelizeError = require("../utils/sequelize-error-handler.util");

const CustomerRepository = {
  createCustomer: async function (account_id) {
    try {
      result = await CustomerModel.create({account_id});
      return result.dataValues.id;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  getCustomerById: async function (id) {
    try {
      return await CustomerModel.findByPk(id);
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
};

module.exports = CustomerRepository;
