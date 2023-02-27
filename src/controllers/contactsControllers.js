const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  updateSubscription,
} = require("../models/contacts");

const getContactsCtrl = async (req, res, next) => {
  const { owner } = req.user[0];
  const { skip = 0, limit = 5, favorite = null} = req.query;
  
  const contacts = await listContacts(owner, { skip, limit, favorite});
  return res.status(200).json({ contacts });
};

const getContactByIdCtrl = async (req, res, next) => {
  const { contactId } = req.params;
  const { owner } = req.user[0];
  const contact = await getContactById(contactId, owner);

  return res.status(200).json(contact);
};
const addContactCtrl = async (req, res, next) => {
  const { owner } = req.user[0];
  const contact = await addContact(req.body, owner);

  return res.status(201).json({ message: "Contact Added", contact });
};

const removeContactCtrl = async (req, res, next) => {
  const { contactId } = req.params;
  const { owner } = req.user[0];
  const contact = await removeContact(contactId, owner);

  return res.status(200).json({ message: "Contact Deleted", contact });
};

const updateContactCtrl = async (req, res, next) => {
  const { contactId } = req.params;
  const { owner } = req.user[0];

  await updateContact(contactId, req.body, owner);
  return res
    .status(200)
    .json({ message: "Status success", changedBody: req.body });
};

const getUpdateFavoriteCtrl = async (req, res, next) => {
  const { contactId } = req.params;
  const { owner } = req.user[0];

  const result = await updateStatusContact(contactId, req.body, owner);

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
