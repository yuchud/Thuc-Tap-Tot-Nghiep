const ErrorTypes = {
    Account: {
      UNIQUE_CONSTRAINT_ERROR: {
        code: "1001",
        message: "Unique constraint violation"
      },
      NOT_FOUND: {
        code: "1002",
        message: "Username or gmail not found"
      },
      WRONG_PASSWORD: {
        code: "1003",
        message: "Wrong password"
      },
      PASSWORD_TOO_SHORT: {
        code: "1004",
        message: "Password must be at least 6 characters"
      },
      PASSWORD_TOO_LONG: {
        code: "1005",
        message: "Password must be at most 50 characters"
      },
      PASSWORD_NOT_CHANGE: {
        code: "1006",
        message: "Password must be different from the previous password"
      },
      USERNAME_DUPLICATED: {
        code: "1007",
        message: "Username already in use"
      },
      EMAIL_DUPLICATED: {
        code: "1008",
        message: "Email already in use"
      },
      // Add more Account-specific error types as needed
    },
    Customer: {
      NOT_FOUND: {
        code: "2001",
        message: "Customer not found"
      },
      INVALID_EMAIL: {
        code: "2002",
        message: "Invalid email address"
      },
      DUPLICATE_EMAIL: {
        code: "2003",
        message: "Email address already in use"
      },
      // Add more Customer-specific error types as needed
    },
    // Add more categories as needed
  };
  
  module.exports = ErrorTypes;