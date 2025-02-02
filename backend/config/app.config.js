module.exports = {
    PORT: process.env.PORT || 3000, 
    USER_ROLES: {
        ADMIN: 1,
        CUSTOMER: 2
    },
    JWT_SECRET: process.env.JWT_SECRET,
    LOGIN_TOKEN_EXPIRATION: 7 * 24 * 60 * 60, // 7 days
};