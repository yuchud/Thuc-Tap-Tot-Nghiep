const { sendEmail } = require('../utils/email.util');
const { generateOTP } = require('../utils/otp.util');
const AccountModel = require('../models/account.model');
let otpStore = {}; // Temporary in-memory store for OTPs

const sendOtpToEmail = async (email) => {
  try {
    const account = await AccountModel.findOne({ where: { email } });
    if (!account) {
      return { success: false, message: 'Account not found' };
    }
    console.log('Sending OTP to email:', email);
    const otp = generateOTP();
    otpStore[email] = otp; // Store OTP in memory
    console.log(otpStore);
    setTimeout(() => {
      delete otpStore[email];
      console.log(`OTP for ${email} has been cleared.`);
    }, 600000);

    const emailContent = `
      <p>Your OTP code is: <strong>${otp}</strong></p>
      <p>This code will expire in 10 minutes.</p>
    `;

    await sendEmail(email, 'Your OTP Code', emailContent);
    return { success: true, message: 'OTP sent to email' };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, message: error.message };
  }
};

module.exports = {
  sendOtpToEmail,
  otpStore,
};
