const { getIdValidation } = require("../helpers/apiHelpers");
const { Contact } = require("../db/contactModel");
const { WrongParametersError } = require("../helpers/errors");

const listContacts = async (owner, { skip, limit }) => {
  const contacts = await Contact.find({ owner })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit)
    
  return contacts;
};

const getContactById = async (contactId, owner) => {
  getIdValidation(contactId);
  const contact = await Contact.findOne({ _id: contactId, owner });

  if (!contact) {
    throw new WrongParametersError("Not Found");
  }

  return contact;
};

const removeContact = async (contactId, owner) => {
  getIdValidation(contactId);
  const contact = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!contact) {
    throw new WrongParametersError("Not Found");
  }

  return contact;
};

const addContact = async (body, owner) => {
  const { name, email, phone } = body;
  const newContact = new Contact({ name, email, phone, owner });
  await newContact.save();
  return newContact;
};

const updateContact = async (contactId, body, owner) => {
  getIdValidation(contactId);
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    body
  );
  if (!updatedContact) {
    throw new WrongParametersError("Not Found");
  }
  return updatedContact;
};

const updateStatusContact = async (contactId, body, owner) => {
  getIdValidation(contactId);
  const { favorite } = body;

  if (!body) {
    throw new WrongParametersError("Missing field favorite");
  }
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    {
      $set: { favorite },
    }
  );

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
