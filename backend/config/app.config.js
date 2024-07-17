module.exports = {
  DEV_PORT: process.env.PORT || 3000,
  USER_ROLE: {
    ADMIN: 1,
    CUSTOMER: 2,
  },
  JWT_SECRET: process.env.JWT_SECRET,
  LOGIN_TOKEN_EXPIRATION: 7 * 24 * 60 * 60, // 7 days
  DEFAULT_COURSE_IMAGE:
    'https://yuchudblob.blob.core.windows.net/images/courses/default/1.png',
  DEFAULT_DECK_IMAGE:
    'https://yuchudblob.blob.core.windows.net/images/decks/default/deck.png',
};
