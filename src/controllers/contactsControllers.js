const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

const getContactsCtrl = async (req, res, next) => {
  const contacts = await listContacts();
  return res.status(200).json({ contacts });
};

const getContactByIdCtrl = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  return res.status(200).json(contact);
};
const addContactCtrl = async (req, res, next) => {
  const contact = await addContact(req.body);

  return res.status(201).json({ message: "Contact Added", contact });
};

const removeContactCtrl = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);

  return res.status(200).json({ message: "Contact Deleted", contact });
};

const updateContactCtrl = async (req, res, next) => {
  const { contactId } = req.params;
  await updateContact(contactId, req.body);
  return res.status(200).json({ message: "Status success", changedBody: req.body });
};

const getUpdateFavoriteCtrl = async (req, res, next) => {  
  const { contactId } = req.params;

  const result = await updateStatusContact(contactId, req.body);

  return res.status(200).json(result);
};

module.exports = {
  getContactsCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactCtrl,
  getUpdateFavoriteCtrl,
};
