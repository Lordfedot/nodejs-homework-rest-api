const express = require("express");
const multer = require("multer");
const path = require("path");


const { asyncWrapper } = require("../helpers/apiHelpers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { uploadCtrl } = require("../controllers/filesController");

const AVATAR_DIR = path.resolve("./src/public/avatars");
const FILE_DIR = path.resolve("tmp");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR);
  },
  filename: async (req, file, cb) => {
    const name = file.originalname;
    cb(null, `${name}`);
    
  },
});

const uploadMiddleware = multer({ storage });

router.patch("/users/avatars", [authMiddleware, uploadMiddleware.single("avatar")], asyncWrapper(uploadCtrl));
router.use("/avatars", express.static(AVATAR_DIR));

module.exports = { filesRouter: router };
