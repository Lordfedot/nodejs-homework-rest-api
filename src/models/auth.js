const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  NotAuthorizedError,
  ConflictError,
  WrongParametersError,
} = require("../helpers/errors");
const { User } = require("../db/userModel");

const register = async (email, password) => {
  const user = new User({ email, password });
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
  user.save()

  return { token, user };
};
const logout = async (user) => {
  if (!user) {
    throw new NotAuthorizedError("Not authorized");
  }
  const currentUser = await User.findById(user.owner);
  currentUser.token = ''
  currentUser.save()
  return currentUser;
};
const current = async (owner) => {
  const currentUser = await User.findById(owner);
  if (!currentUser) {
    throw new NotAuthorizedError("Not authorized");
  }
  return currentUser;
};

const updateSubscription = async (owner, subscription) => {
  const result = await User.findOneAndUpdate(
    { _id: owner },
    { $set: { subscription } }
  );
  return result;
};

module.exports = { register, login, current, logout, updateSubscription };
