const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");
  if (!token) {
    next(NotAuthorizedError("Not authorized"))
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET)
    req.user = [user, token]  
  } catch (error) {
    next(NotAuthorizedError("Not authorized"))
  }
  next()
};

module.exports = { authMiddleware };
