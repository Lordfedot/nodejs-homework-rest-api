const { requestError } = require("../helpers/errors");
const { Contact } = require("../db/contactModel");
const mongoose = require('mongoose')
const getIdValidation = (id) => mongoose.Types.ObjectId.isValid(id)

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  if (!getIdValidation(contactId)) {
    throw requestError(404, 'Invalid Id')
  }
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw requestError(404, "Not Found");
  }

  return contact;
};

const removeContact = async (contactId) => {
  if (!getIdValidation(contactId)) {
    throw requestError(404, 'Invalid Id')
  }
  const contact = await Contact.findByIdAndDelete(contactId);

  if (!contact) {
    throw requestError(404, "Not Found");
  }

  return contact;
};

const addContact = async (body) => {
  const newContact = new Contact(body);
  await newContact.save();
  return newContact;
};

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body);
  if (!updatedContact) {
    throw requestError(404, "Not Found");
  }
  return updatedContact;
};

const updateStatusContact = async (contactId, body) => {
  if (!getIdValidation(contactId)) {
    throw requestError(404, 'Invalid Id')
  }
  const { favorite } = body;
  console.log(body);
  if (!body) {
    throw requestError(400, "Missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(contactId, {
    $set: { favorite },
  });

  if (!result) {
    throw requestError(404, "Not Found");
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
