// utils/emails.js

// In production, you can use nodemailer here
const sendEmail = (to, subject, text) => {
  console.log(`Sending email to ${to}: ${subject} - ${text}`);
};

module.exports = { sendEmail };
