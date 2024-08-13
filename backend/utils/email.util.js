require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('EMAIL_USER:', process.env.EMAIL_USER); // Add this line to verify
console.log('EMAIL_PASS:', process.env.EMAIL_PASS); // Add this line to verify

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
  sendEmail,
};
