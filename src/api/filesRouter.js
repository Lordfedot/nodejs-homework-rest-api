const express = require("express");
const multer = require("multer");
const path = require("path");

const { asyncWrapper } = require("../helpers/apiHelpers");

const { uploadCtrl } = require("../controllers/filesController");


const router = express.Router();
const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, path.resolve('../../public'))
    },
    filename: (req, file, cb) => {
        const [filename, extension] = file.originalname.split('.')
        cb(null, `${filename}.${extension}`)
    }
})

const uploadMiddleware = multer({storage})

router.post("/upload",uploadMiddleware.single('avatar'), asyncWrapper(uploadCtrl));

module.exports = { filesRouter: router };
