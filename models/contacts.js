const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const updateJSON = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return;
  }
  const contactToRemove = contacts.splice(index, 1);
  updateJSON(contacts);
  return contactToRemove;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: new Date().getTime().toString(),
    ...body,
  };
  contacts.push(newContact);
  await updateJSON(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return;
  }
  contacts[index] = { id: contactId, ...body };
  updateJSON(contacts);
  console.log(contacts[index]);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
