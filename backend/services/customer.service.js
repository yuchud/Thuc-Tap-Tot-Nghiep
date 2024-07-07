const customerRepository = require("../repositories/customer.repository");

const customerService = {
  createCustomer: async function (customer) {
    return customerRepository.createCustomer(customer);
  },
  getCustomerById: async function (id) {
    return customerRepository.getCustomerById(id);
  },
};

module.exports = customerService;
