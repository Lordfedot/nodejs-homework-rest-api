const { NotAuthorizedError } = require("../helpers/errors");
const { register, login, current, updateSubscription } = require("../models/auth");

const registrationCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await register(email, password);

  res.json({ email, subscription: user.subscription });
};

const loginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  const { token, user } = await login(email, password);
  res.json({
    user: { email: user.email, subscription: user.subscription },
    token,
  });
};

const logoutCtrl = async (req, res, next) => {
  let [user, token] = req.user;
  if (!user) {
    throw new NotAuthorizedError("Not authorized");
  }
  token = "";

  res.json({ message: "Logout success" });
};

const currentCtrl = async (req, res, next) => {
  const [{ owner }, token] = req.user;
  const currentUser = await current(owner);
  res.json({
    email: currentUser.email,
    subscription: currentUser.subscription,
  });
};

const updateSubscriptionCtrl = async (req, res, next) => {
  const {subscription } = req.body;
  const [{ owner }, token] = req.user;
  
  await updateSubscription(owner,subscription)

  res.json({ status: "success" });
};

module.exports = {
  registrationCtrl,
  loginCtrl,
  logoutCtrl,
  currentCtrl,
  updateSubscriptionCtrl,
};
