const express = require("express");
const { getValidation } = require("../../middle/middlewaresValidation");
const {
  getContactsCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactCtrl,
} = require("../../controllers/contactsControllers");

const router = express.Router();

router.get("/", getContactsCtrl);

router.get("/:contactId", getContactByIdCtrl);

router.post("/", getValidation, addContactCtrl);

router.delete("/:contactId", removeContactCtrl);

router.put("/:contactId", getValidation, updateContactCtrl);

module.exports = router;
