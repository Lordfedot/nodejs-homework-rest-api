const express = require("express");
const { asyncWrapper } = require("../helpers/apiHelpers");

const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  
} = require("../controllers/");

const router = express.Router();

router.post("/upload", asyncWrapper(registrationCtrl));

module.exports = { authRouter: router };
