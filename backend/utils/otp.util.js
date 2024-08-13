const crypto = require('crypto');

const generateOTP = () => {
  return crypto.randomInt(100000, 999999);
};

const verifyOTP = (otp, userOtp) => {
  return otp === userOtp;
};

module.exports = {
  generateOTP,
  verifyOTP,
};
