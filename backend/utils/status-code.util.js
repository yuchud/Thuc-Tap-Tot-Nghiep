const ErrorTypes = {
  Operation: {
    SUCCESS: {
      code: "1",
      message: "Operation completed successfully",
    },
    FAILURE: {
      code: "0",
      error: "Operation failed",
    },
  },

  Account: {
    UNIQUE_CONSTRAINT_ERROR: {
      code: "1001",
      error: "Unique constraint violation",
    },
    NOT_FOUND: {
      code: "1002",
      error: "Username or gmail not found",
    },
    WRONG_PASSWORD: {
      code: "1003",
      error: "Wrong password",
    },
    PASSWORD_TOO_SHORT: {
      code: "1004",
      error: "Password must be at least 6 characters",
    },
    PASSWORD_TOO_LONG: {
      code: "1005",
      error: "Password must be at most 50 characters",
    },
    PASSWORD_NOT_CHANGE: {
      code: "1006",
      error: "Password must be different from the previous password",
    },
    USERNAME_DUPLICATED: {
      code: "1007",
      error: "Username already in use",
    },
    EMAIL_DUPLICATED: {
      code: "1008",
      error: "Email already in use",
    },
  },
  Customer: {
    NOT_FOUND: {
      code: "2001",
      error: "Customer not found",
    },
    INVALID_EMAIL: {
      code: "2002",
      error: "Invalid email address",
    },
    DUPLICATE_EMAIL: {
      code: "2003",
      error: "Email address already in use",
    },
    // Add more Customer-specific error types as needed
  },
};

module.exports = ErrorTypes;
