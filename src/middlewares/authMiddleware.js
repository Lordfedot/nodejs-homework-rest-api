const jwt = require("jsonwebtoken") 
const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
  if (!req.headers["authorization"]) {
    next(new NotAuthorizedError("Not authorized"))
  }
  const [tokenType, token] = req.headers["authorization"].split(" ");
  if (!token) {
    next(new NotAuthorizedError("Not authorized"))
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET)
    req.user = [user, token]  
  } catch (error) {
    next(new NotAuthorizedError("Not authorized"))
  }
  next()
};

module.exports = { authMiddleware };
