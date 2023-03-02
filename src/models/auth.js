const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  NotAuthorizedError,
  ConflictError,
  WrongParametersError,
  ValidationError,
} = require("../helpers/errors");
const { User } = require("../db/userModel");
const { getUrlForAvatar } = require("../helpers/getAvatar");
const {
  sendVerificationToken,
  sendVerificationSuccess,
} = require("../helpers/sendlers");


const register = async (email, password) => {
  const avatarURL = getUrlForAvatar(email);

  const verificationToken = await sendVerificationToken(email);
  const user = new User({ email, password, avatarURL, verificationToken });

  const emailInUse = await User.findOne({ email });
  if (emailInUse) {
    throw new ConflictError("Email in use");
  }

  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });
  if (!user) {
    throw new NotAuthorizedError("User not found");
  }

  const wrongPassword = !(await bcrypt.compare(password, user.password));
  if (wrongPassword) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  const token = jwt.sign(
    {
      owner: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
  user.token = token;
  user.save();

  return { token, user };
};
const logout = async (user) => {
  if (!user) {
    throw new NotAuthorizedError("Not authorized");
  }
  const currentUser = await User.findById(user.owner);
  currentUser.token = "";
  currentUser.save();
  return currentUser;
};
const current = async (owner) => {
  const currentUser = await User.findById(owner);
  if (!currentUser) {
    throw new NotAuthorizedError("Not authorized");
  }
  return currentUser;
};

const verify = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new WrongParametersError("User not found");
  }
  user.verify = true;
  user.verificationToken.required = false;
  await user.save();

  await sendVerificationSuccess(user.email);
};
const repeatVerify = async (email) => {
  if (!email) {
    throw new ValidationError("missing required field email");
  }
  const user = await User.findOne({email});
  if (user.verify === true) {
    throw new WrongParametersError("Verification has already been passed");
  } else{
    sendVerificationToken(email)
  }

};

const updateSubscription = async (owner, subscription) => {
  const result = await User.findOneAndUpdate(
    { _id: owner },
    { $set: { subscription } }
  );
  return result;
};

module.exports = { register, login, current, verify, repeatVerify, logout, updateSubscription };

