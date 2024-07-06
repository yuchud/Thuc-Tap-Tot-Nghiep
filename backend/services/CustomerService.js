const customerRepository = require('../repositories/CustomerRepository');

const customerService = {
    createCustomer: async function(customer) {
        return await customerRepository.createCustomer(customer);
    },
    getCustomerById: async function(id) {
        return await customerRepository.getCustomerById(id);
    },
};

module.exports = customerService;