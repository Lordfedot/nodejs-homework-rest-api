const gravatar = require("gravatar");

const getUrlForAvatar = (email) => {
  return gravatar.url(email);
};

module.exports = { getUrlForAvatar };
