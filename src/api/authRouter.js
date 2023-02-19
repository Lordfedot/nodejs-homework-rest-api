const express = require("express");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { getAuthValidation } = require("../middlewares/middlewaresValidation");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  registrationCtrl,
  loginCtrl,
  logoutCtrl,
  currentCtrl,
} = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", getAuthValidation, asyncWrapper(registrationCtrl));
router.post("/login", getAuthValidation, asyncWrapper(loginCtrl));
router.post("/logout", authMiddleware, asyncWrapper(logoutCtrl));
router.get("/current", authMiddleware, asyncWrapper(currentCtrl));

module.exports = { authRouter: router };
