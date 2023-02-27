const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContactsCtrl = async (req, res, next) => {
  const contacts = await listContacts();
  return res.json({ contacts });
};

const getContactByIdCtrl = async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  } else {
    return res.status(200).json(contact);
  }
};
const addContactCtrl = async (req, res, next) => {

  const result = await addContact(req.body);
  return res.status(201).json(result);
};

const removeContactCtrl = async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);

  return res.status(200).json({ message: "contact deleted" });
};

const updateContactCtrl = async (req, res, next) => {
  const result = await updateContact(req.params.contactId, req.body);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(result);
};

module.exports = {
  getContactsCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactCtrl,
};
