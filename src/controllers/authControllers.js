const { NotAuthorizedError } = require("../helpers/errors");
const {
  register,
  login,
  current,
  verify,
  repeatVerify,
} = require("../models/auth");

const registrationCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await register(email, password);
  res.json({ email: user.email, subscription: user.subscription });
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

const verifyCtrl = async (req, res, next) => {
  const { verificationToken } = req.params;

  await verify(verificationToken);

  res.json({ message: "Verification successful" });
};

const repeatVerifyCtrl = async (req, res, next) => {
  const { email } = req.body;

  await repeatVerify(email);

  res.json({ message: "success" });
};

module.exports = {
  registrationCtrl,
  loginCtrl,
  logoutCtrl,
  currentCtrl,
  verifyCtrl,
  repeatVerifyCtrl,
};
