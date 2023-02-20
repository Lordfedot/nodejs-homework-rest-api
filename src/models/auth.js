const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NotAuthorizedError, ConflictError } = require("../helpers/errors");
const { User } = require("../db/userModel");
const { getUrlForAvatar } = require("../helpers/getAvatar");

const register = async (email, password) => {
  const avatarURL = getUrlForAvatar(email);
  console.log(avatarURL);

  const user = new User({ email, password, avatarURL });
  const emailInUse = await User.findOne({ email });
  if (emailInUse) {
    throw new ConflictError("Email in use");
  }
  await user.save();
  return user;
};
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError("Not user find");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  const token = jwt.sign(
    {
      owner: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
  return { token, user };
};

const current = async (owner) => {
  const currentUser = await User.findById(owner);
  if (!currentUser) {
    throw new NotAuthorizedError("Not authorized");
  }
  return currentUser;
};

module.exports = { register, login, current };
