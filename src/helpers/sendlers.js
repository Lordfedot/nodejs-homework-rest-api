const sgMail = require("@sendgrid/mail");
const { v4: uuidv4 } = require("uuid");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationToken = async (email) => {
  const verificationToken = uuidv4();

  const msg = {
    to: email,
    from: "orestmazgal@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text: `Verify email, GET http://localhost:3000/api/users/verify/${verificationToken}`,
    html: `Verify email, GET http://localhost:3000/api/users/verify/${verificationToken}`,
  };
  await sgMail.send(msg);
  return verificationToken;
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
