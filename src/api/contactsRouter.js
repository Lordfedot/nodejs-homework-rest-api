const express = require("express");

const { getValidation, getFavoriteValidation } = require("../middlewares/middlewaresValidation");
const { asyncWrapper } = require("../helpers/apiHelpers");
const {authMiddleware} = require("../middlewares/authMiddleware")
const {
  getContactsCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactCtrl,
  getUpdateFavoriteCtrl,
} = require("../controllers/contactsControllers");

const router = express.Router();

router.use(authMiddleware)

router.get("/", asyncWrapper(getContactsCtrl));

router.get("/:contactId", asyncWrapper(getContactByIdCtrl));

router.post("/", getValidation, asyncWrapper(addContactCtrl));

router.delete("/:contactId", asyncWrapper(removeContactCtrl));

router.put("/:contactId", getValidation, asyncWrapper(updateContactCtrl));

router.patch("/:contactId/favorite", getFavoriteValidation, asyncWrapper(getUpdateFavoriteCtrl));

module.exports = {contactsRouter: router};
