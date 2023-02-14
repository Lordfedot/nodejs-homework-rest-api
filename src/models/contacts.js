const { getIdValidation } = require("../helpers/apiHelpers");
const { Contact } = require("../db/contactModel");
const { WrongParametersError } = require("../helpers/errors");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  getIdValidation(contactId);
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new WrongParametersError("Not Found");
  }

  return contact;
};

const removeContact = async (contactId) => {
  getIdValidation(contactId);
  const contact = await Contact.findByIdAndDelete(contactId);

  if (!contact) {
    throw new WrongParametersError("Not Found");
  }

  return contact;
};

const addContact = async (body) => {
  const newContact = new Contact(body);
  await newContact.save();
  return newContact;
};

const updateContact = async (contactId, body) => {
  getIdValidation(contactId);
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body);
  if (!updatedContact) {
    throw new WrongParametersError("Not Found");
  }
  return updatedContact;
};

const updateStatusContact = async (contactId, body) => {
  getIdValidation(contactId);
  const { favorite } = body;

  if (!body) {
    throw new WrongParametersError("Missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(contactId, {
    $set: { favorite },
  });

  if (!result) {
    throw new WrongParametersError("Not Found");
  }

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
