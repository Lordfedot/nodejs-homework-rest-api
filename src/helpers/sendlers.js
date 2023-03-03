const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationToken = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: "orestmazgal@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text: `Verify email, GET http://localhost:3000/api/users/verify/${verificationToken}`,
    html: `Verify email, GET http://localhost:3000/api/users/verify/${verificationToken}`,
  };
  await sgMail.send(msg);
};

const sendVerificationSuccess = async (email) => {
  const msg = {
    to: email,
    from: "orestmazgal@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text: `Verification confirmed`,
    html: `Verification confirmed`,
  };
  await sgMail.send(msg);
};

module.exports = { sendVerificationToken, sendVerificationSuccess };
